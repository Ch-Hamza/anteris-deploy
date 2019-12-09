package com.anteris.backend.Repository;

import com.anteris.backend.Model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    List<Vote> findByEnabled(boolean enabled);
    Optional<Vote> findByIdAndEnabled(long id, boolean enabled);
}
