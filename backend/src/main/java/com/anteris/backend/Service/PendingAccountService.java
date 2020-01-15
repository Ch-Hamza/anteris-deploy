package com.anteris.backend.Service;
import com.anteris.backend.Message.request.PendingUserRequest;
import com.anteris.backend.Message.response.ResponseMessage;
import com.anteris.backend.Model.PendingUser;
import com.anteris.backend.Model.User;
import com.anteris.backend.Model.Vote;
import com.anteris.backend.Repository.PendingUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class PendingAccountService {

    @Autowired
    PendingUserRepository pendingUserRepository;

    public ResponseEntity<PendingUser> findByLink(String link) {
        Optional<PendingUser> pendingUser = pendingUserRepository.findByLink(link);
        if(pendingUser.isPresent()) {
            return new ResponseEntity<>(pendingUser.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<Long> countPendingUsers() {
        return new ResponseEntity<>(pendingUserRepository.count(),HttpStatus.OK);
    }
    public ResponseEntity<?> newPendingUser(PendingUserRequest pendingUserRequest) {

        if (pendingUserRepository.existsByEmail(pendingUserRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Invitation is already sent!"),
                    HttpStatus.BAD_REQUEST);
        }
        PendingUser pendingUser = new PendingUser();
        System.out.println(pendingUserRequest.getEmail());
        pendingUser.setEmail(pendingUserRequest.getEmail());
        try {
            pendingUser.setLink(HashFunction.toHexString(HashFunction.getSHA(pendingUserRequest.getEmail())));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        pendingUserRepository.save(pendingUser);
        String link = "http://localhost:4200/pending/" +pendingUser.getLink();
        return new ResponseEntity<>(new ResponseMessage(link), HttpStatus.OK);
    }
    public ResponseEntity<String> removePendingUser(String email) {

        Optional<PendingUser> pendingUserOptional = pendingUserRepository.findByEmail(email);
        if(pendingUserOptional.isPresent()) {
            pendingUserRepository.delete(pendingUserOptional.get());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<String> removeAllPendingUsers() {
        pendingUserRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
