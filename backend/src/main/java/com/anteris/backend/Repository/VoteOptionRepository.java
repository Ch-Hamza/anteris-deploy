package com.anteris.backend.Repository;

import com.anteris.backend.Model.VoteOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteOptionRepository extends JpaRepository<VoteOption, Long> {

    List<VoteOption> findVoteOptionByVote_Id(long id);
}
