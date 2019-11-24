package com.anteris.backend.Controller;

import com.anteris.backend.Model.User;
import com.anteris.backend.Repository.UserRepository;
import com.anteris.backend.Service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UploadRestAPI {

    @Autowired
    StorageService storageService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/upload-file/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable("id") long id) {
        String message;
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if(userOptional.isPresent()) {
                User user = userOptional.get();

                String newName = file.getOriginalFilename().replaceAll("\\s+","");
                user.setImage(newName);
                storageService.store(file, newName);
                userRepository.save(user);
                message = "You successfully uploaded " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.OK).body(message);
            } else {
                message = "User not found";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            message = "FAILED to upload " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @DeleteMapping("/delete-file/{id}/{filename}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> removeFile(@PathVariable("id") long id, @PathVariable("filename") String filename) {
        String message = "";
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if(userOptional.isPresent()) {
                User user = userOptional.get();
                user.setImage("");
                userRepository.save(user);
                storageService.delete(filename);
                message = "document deleted successfully";
                return ResponseEntity.status(HttpStatus.OK).body(message);
            } else {
                message = "Consultant or document not found";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @GetMapping("/files/{filename:.+}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
