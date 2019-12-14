package com.anteris.backend.Service;

import com.anteris.backend.Message.response.DonationResponse;
import com.anteris.backend.Message.response.ResponseMessage;
import com.anteris.backend.Message.response.VoteResponse;
import com.anteris.backend.Model.Donation;
import com.anteris.backend.Model.User;
import com.anteris.backend.Model.Vote;
import com.anteris.backend.Repository.DonationRepository;
import com.anteris.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DonationService {

    @Autowired
    DonationRepository donationRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<List<DonationResponse>> findAll() {
        try {
            List<Donation> donations = donationRepository.findAll();
            List<DonationResponse> donationResponses = new ArrayList<>();
            if(donations.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            donations.forEach(donation -> {
                DonationResponse donationResponse = new DonationResponse();
                donationResponse.setAmount(donation.getMontant());
                donationResponse.setUser_id(donation.getUser().getId().toString());
                donationResponses.add(donationResponse);
            });

            return new ResponseEntity<>(donationResponses, HttpStatus.OK);

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> donate(DonationResponse donationResponse) {

        Optional<User> userOptional = userRepository.findByIdAndEnabled(Long.parseLong(donationResponse.getUser_id()), true);
        if(userOptional.isPresent()) {
            Donation donation = new Donation();
            donation.setMontant(donationResponse.getAmount());
            donation.setUser(userOptional.get());
            donationRepository.save(donation);
            return new ResponseEntity<>(donation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseMessage("User no found"), HttpStatus.NOT_FOUND);
        }
    }
}
