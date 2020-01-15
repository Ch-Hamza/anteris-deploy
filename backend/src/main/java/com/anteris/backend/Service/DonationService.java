package com.anteris.backend.Service;

import com.anteris.backend.Message.response.DonationResponse;
import com.anteris.backend.Message.response.DonationStats;
import com.anteris.backend.Message.response.ResponseMessage;
import com.anteris.backend.Message.response.TopDonation;
import com.anteris.backend.Model.Donation;
import com.anteris.backend.Model.User;
import com.anteris.backend.Repository.DonationRepository;
import com.anteris.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

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
                DonationResponse donationResponse = setResponse(donation);
                donationResponses.add(donationResponse);
            });

            return new ResponseEntity<>(donationResponses, HttpStatus.OK);

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> donate(DonationResponse donationResponse) {

        Optional<User> userOptional = userRepository.findByIdAndEnabled(donationResponse.getUser_id(), true);
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            Donation donation = setData(donationResponse, user);

            donationRepository.save(donation);
            return new ResponseEntity<>(donationResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseMessage("User no found"), HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<DonationResponse> findById(long id) {
        Optional<Donation> donationOptional = donationRepository.findById(id);
        if(donationOptional.isPresent()) {
            Donation donation = donationOptional.get();
            DonationResponse donationResponse = setResponse(donation);
            return new ResponseEntity<>(donationResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<DonationResponse>> findByUserId(long id) {
        try {
            List<Donation> donations = donationRepository.findDonationByUser_id(id);
            List<DonationResponse> donationResponses = new ArrayList<>();
            if(donations.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            donations.forEach(donation -> {
                DonationResponse donationResponse = setResponse(donation);
                donationResponses.add(donationResponse);
            });

            return new ResponseEntity<>(donationResponses, HttpStatus.OK);

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<DonationStats> findStats() {
        DonationStats donationStats = new DonationStats();

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Calendar cal1 = Calendar.getInstance();
        String currentDate = dateFormat.format(cal1.getTime());
        String[] dates = currentDate.split("/");

        donationStats.setTotal_month_donations(0);
        List<Donation> donationsThisMonth = donationRepository.findDonationsPerMonthAndDonationInfoId(dates[1]);
        donationsThisMonth.forEach(donation -> {
            long oldTotal = donationStats.getTotal_month_donations();
            donationStats.setTotal_month_donations(Long.parseLong(donation.getMontant()) + oldTotal);
        });

        donationStats.setTotal_donations(0);
        List<Donation> allDonations = donationRepository.findAll();
        allDonations.forEach(donation -> {
            long oldTotal = donationStats.getTotal_donations();
            donationStats.setTotal_donations(Long.parseLong(donation.getMontant()) + oldTotal);
        });

        List<TopDonation> topDonations = new ArrayList<>();
        List<Donation> topDonationsDB = donationRepository.findTopDonations();
        topDonationsDB.forEach(donation -> {
            TopDonation topDonation = new TopDonation();
            topDonation.setFullname(donation.getUser().getFirstname() + " " + donation.getUser().getLastname());
            topDonation.setImage("default-user-image.png");
            topDonation.setAmount(Long.parseLong(donation.getMontant()));
            topDonations.add(topDonation);
        });
        donationStats.setTop_donations(topDonations);
        return new ResponseEntity<>(donationStats, HttpStatus.OK);
    }

    public DonationResponse setResponse(Donation donation) {
        DonationResponse donationResponse = new DonationResponse();
        donationResponse.setId(donation.getId());
        donationResponse.setAmount(donation.getMontant());
        donationResponse.setUser_fullname(donation.getUser().getFirstname() + " " + donation.getUser().getLastname());
        donationResponse.setDate(donation.getDate());
        return donationResponse;
    }

    public Donation setData(DonationResponse donationResponse, User user) {
        Donation donation = new Donation();
        donation.setMontant(donationResponse.getAmount());
        donation.setUser(user);

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Calendar cal1 = Calendar.getInstance();
        String currentDate = dateFormat.format(cal1.getTime());
        donation.setDate(currentDate);
        return donation;
    }
}
