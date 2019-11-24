package com.anteris.backend.Controller;

import com.anteris.backend.Message.request.LoginForm;
import com.anteris.backend.Message.request.SignUpForm;
import com.anteris.backend.Message.request.UserInfo;
import com.anteris.backend.Message.response.JwtResponse;
import com.anteris.backend.Message.response.ResponseMessage;
import com.anteris.backend.Model.Role;
import com.anteris.backend.Model.RoleName;
import com.anteris.backend.Model.User;
import com.anteris.backend.Repository.RoleRepository;
import com.anteris.backend.Repository.UserRepository;
import com.anteris.backend.Security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth/users")
public class AuthRestAPIs {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User userDb = userRepository.findByUsername(loginRequest.getUsername()).get();
        List<String> roles = new ArrayList<>();
        Set<Role> _roles = userDb.getRoles();
        _roles.forEach(role -> {
            roles.add(role.getName().name());
        });
        UserInfo user = new UserInfo(userDb.getId(), userDb.getFirstname(), userDb.getLastname(), userDb.getUsername(),
                roles, userDb.isEnabled(), userDb.getImage(), userDb.getEmail());

        if(user.isEnabled()) {
            return ResponseEntity.ok(new JwtResponse(jwt, user, userDetails.getAuthorities()));
        }
        return new ResponseEntity<>(new ResponseMessage("Fail -> User is banned!"), HttpStatus.FORBIDDEN);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User();
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setImage(signUpRequest.getImage());
        user.setEnabled(true);

        Set<Role> roles = new HashSet<>();
        Role roleDb = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Fail! -> Cause: Role not found."));
        roles.add(roleDb);

        user.setRoles(roles);
        userRepository.save(user);

        List<String> _roles = new ArrayList<>();
        roles.forEach(role -> {
            _roles.add(role.getName().name());
        });
        UserInfo userInfo = new UserInfo(user.getId(), user.getFirstname(), user.getLastname(),
                user.getUsername(), _roles,
                user.isEnabled(), user.getImage(), user.getEmail());

        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }
}
