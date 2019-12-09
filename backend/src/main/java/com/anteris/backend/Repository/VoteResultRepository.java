package com.anteris.backend.Repository;

import com.anteris.backend.Model.VoteResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoteResultRepository extends JpaRepository<VoteResult, Long> {

    Optional<VoteResult> findVoteResultByVoteOption_IdAndVoteOption_Vote_Id(long id, long vote_id);
    Optional<VoteResult> findVoteResultByVoteOption_Vote_IdAndVoteOption_IdAndUser_Id(long voteId, long voteOptionId, long userId);
    Optional<VoteResult> findVoteResultByVoteOption_Vote_IdAndUser_Id(long voteId, long userId);
}
