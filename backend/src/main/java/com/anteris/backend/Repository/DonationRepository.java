package com.anteris.backend.Repository;

import com.anteris.backend.Model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findDonationByUser_id(long userId);

    @Query(value = "SELECT * FROM donation WHERE SUBSTR(donation.date, 4, 2) = ?1", nativeQuery = true)
    List<Donation> findDonationsPerMonthAndDonationInfoId(String m);

    @Query(value = "SELECT * FROM donation ORDER BY donation.montant DESC LIMIT 4", nativeQuery = true)
    List<Donation> findTopDonations();
}
