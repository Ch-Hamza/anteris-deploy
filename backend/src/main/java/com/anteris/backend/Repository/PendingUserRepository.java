package com.anteris.backend.Repository;

import com.anteris.backend.Model.PendingUser;
import com.anteris.backend.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PendingUserRepository  extends JpaRepository<PendingUser, String> {

    boolean existsByEmail(String email);
    Optional<PendingUser> findByEmail(String email);
    Optional<PendingUser> findByLink(String link);
    void deleteByEmail(String email);
    void deleteAll();
    @Query(value = "SELECT COUNT(*) FROM pending_users", nativeQuery = true)
    long count();
}
