package com.anteris.backend.Controller;


import com.anteris.backend.Message.request.PendingUserRequest;
import com.anteris.backend.Message.request.UserInfo;
import com.anteris.backend.Model.PendingUser;
import com.anteris.backend.Service.PendingAccountService;
import com.anteris.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/pending")
public class PendingUserRestAPI {
    @Autowired
    PendingAccountService pendingAccountService;

    @GetMapping("/{id}")
    public ResponseEntity<PendingUser> getPendingUserById(@PathVariable("id") String id) {
        return pendingAccountService.findById(id);
    }
    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> newPendingUser(@RequestBody PendingUserRequest pendingUserRequest) {
        return pendingAccountService.newPendingUser(pendingUserRequest);
    }

    @DeleteMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAll() {
        return pendingAccountService.removeAllPendingUsers();
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> countPendingUsers() {
        return pendingAccountService.countPendingUsers();
    }

}
