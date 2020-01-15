package com.anteris.backend.Service;

import com.anteris.backend.Message.request.SignUpForm;
import com.anteris.backend.Message.request.UserInfo;
import com.anteris.backend.Message.response.ResponseMessage;
import com.anteris.backend.Model.Role;
import com.anteris.backend.Model.RoleName;
import com.anteris.backend.Model.User;
import com.anteris.backend.Repository.RoleRepository;
import com.anteris.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.*;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    public ResponseEntity<List<UserInfo>> getAll() {

        try {
            List<UserInfo> _users = new ArrayList<>();
            List<User> users = new ArrayList<>(userRepository.findAll());
            if(users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            users.forEach(user -> {
                _users.add(setData(user));
            });

            return new ResponseEntity<>(_users, HttpStatus.OK);

        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<UserInfo>> findByRole(String roleR) {

        try {
            List<UserInfo> _users = new ArrayList<>();
            List<User> users;
            switch (roleR) {
                case "admin":
                    users = new ArrayList<>(userRepository.findUsersByRoles("ROLE_ADMIN"));
                    break;
                case "user":
                    users = new ArrayList<>(userRepository.findUsersByRoles("ROLE_USER"));
                    break;
                default:
                    users = new ArrayList<>();
                    break;
            }

            if(users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            users.forEach(user -> {
                _users.add(setData(user));
            });

            return new ResponseEntity<>(_users, HttpStatus.OK);

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<UserInfo> findById(long id) {

        Optional<User> userOptional = userRepository.findById(id);

        if(userOptional.isPresent()) {

            User user = userOptional.get();
            UserInfo _user = setData(user);

            return new ResponseEntity<>(_user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> newUser(SignUpForm signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User();
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setEnabled(true);

        //Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        Role roleDb = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Fail! -> Cause: Role not found."));
        roles.add(roleDb);

        user.setRoles(roles);
        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }

    public ResponseEntity<?> updateUser(UserInfo user) {

        Optional<User> userOptional = userRepository.findById(user.getId());
        if(userOptional.isPresent()) {
            User _user = userOptional.get();

            if(!_user.getUsername().equals(user.getUsername()))
            {
                if (userRepository.existsByUsername(user.getUsername())) {
                    return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                            HttpStatus.BAD_REQUEST);
                }
            }

            if(!user.getFirstname().equals(""))
            _user.setFirstname(user.getFirstname());

            if(!user.getLastname().equals(""))
            _user.setLastname(user.getLastname());

            if(!user.getUsername().equals(""))
            _user.setUsername(user.getUsername());

            if(!user.getEmail().equals(""))
            _user.setEmail(user.getEmail());

            List<String> _roles = new ArrayList<>();
            Set<Role> roles = _user.getRoles();
            roles.forEach(role -> {
                _roles.add(role.getName().name());
            });
            _user.setRoles(_roles);

            userRepository.save(_user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> updateUserPassword(String email) {

        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isPresent()) {
            User user = userOptional.get();

            RandomString newPassword = new RandomString();
            user.setPassword(encoder.encode(newPassword.nextString()));
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<HttpStatus> banUserById(Long id) {

        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isPresent()) {
            User _user = userOptional.get();
            _user.setEnabled(false);
            userRepository.save(_user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/unban/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> unbanUserById(Long id) {

        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isPresent()) {
            User _user = userOptional.get();
            _user.setEnabled(true);
            userRepository.save(_user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public UserInfo setData(User user) {
        UserInfo _user = new UserInfo();
        _user.setId(user.getId());
        _user.setFirstname(user.getFirstname());
        _user.setLastname(user.getLastname());
        _user.setUsername(user.getUsername());
        _user.setEnabled(user.isEnabled());

        List<String> _roles = new ArrayList<>();
        Set<Role> roles = user.getRoles();
        roles.forEach(role -> {
            _roles.add(role.getName().name());
        });
        _user.setRoles(_roles);
        return _user;
    }
}
