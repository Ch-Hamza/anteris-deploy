package com.anteris.backend.Controller;

import com.anteris.backend.Message.response.MeetingResponse;
import com.anteris.backend.Service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/meeting")
public class MeetingRestAPI {

    @Autowired
    MeetingService meetingService;

    @GetMapping("/user/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<MeetingResponse>> allMeetings(@PathVariable("id") String id) {
        return meetingService.findAll(Long.parseLong(id));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<MeetingResponse> getVoteById(@PathVariable("id") long id) {
        return meetingService.findById(id);
    }

    @PostMapping("/")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> createVote(@RequestBody MeetingResponse meetingResponse) {
        return meetingService.createMeeting(meetingResponse);
    }

    @PutMapping("/")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> updateVote(@RequestBody MeetingResponse meetingResponse) {
        return meetingService.updateMeeting(meetingResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<String> removeVote(@PathVariable("id") long id) {
        return meetingService.removeMeeting(id);
    }
}
