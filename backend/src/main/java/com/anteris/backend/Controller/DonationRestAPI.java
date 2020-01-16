package com.anteris.backend.Controller;

import com.anteris.backend.Message.response.DonationResponse;
import com.anteris.backend.Message.response.DonationStats;
import com.anteris.backend.Message.response.VoteResponse;
import com.anteris.backend.Service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/donation")
public class DonationRestAPI {

    @Autowired
    DonationService donationService;

    @GetMapping("/")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'FINANCIAL_MANAGER')")
    public ResponseEntity<List<DonationResponse>> allDonations() {
        return donationService.findAll();
    }

    @PostMapping("/")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'FINANCIAL_MANAGER')")
    public ResponseEntity<?> donation(@RequestBody DonationResponse donationResponse) {
        return donationService.donate(donationResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'FINANCIAL_MANAGER')")
    public ResponseEntity<DonationResponse> getDonationById(@PathVariable("id") long id) {
        return donationService.findById(id);
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'FINANCIAL_MANAGER')")
    public ResponseEntity<List<DonationResponse>> getDonationsByUserId(@PathVariable("id") long id) {
        return donationService.findByUserId(id);
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'FINANCIAL_MANAGER')")
    public ResponseEntity<DonationStats> getDonationStats() {
        return donationService.findStats();
    }
}
