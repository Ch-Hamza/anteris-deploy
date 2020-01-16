package com.anteris.backend.Controller;

import com.anteris.backend.Message.request.VoteForm;
import com.anteris.backend.Message.response.VoteResponse;
import com.anteris.backend.Service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/vote")
public class VoteRestAPI {

    @Autowired
    VoteService voteService;

    @GetMapping("/")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<VoteResponse>> allVotes() {
        return voteService.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<VoteResponse> getVoteById(@PathVariable("id") long id) {
        return voteService.findById(id);
    }

    @PostMapping("/")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> createVote(@RequestBody VoteResponse voteResponse) {
        return voteService.createVote(voteResponse);
    }

    @PutMapping("/")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> updateVote(@RequestBody VoteResponse voteResponse) {
        return voteService.updateVote(voteResponse);
    }

    @PutMapping("/send-vote")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> vote(@RequestBody VoteForm voteForm) {
        return voteService.vote(voteForm);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<String> removeVote(@PathVariable("id") long id) {
        return voteService.removeVote(id);
    }
}
