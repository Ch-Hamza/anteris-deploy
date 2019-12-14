package com.anteris.backend.Repository;

import com.anteris.backend.Model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepository extends JpaRepository<Donation, Long> {
}
