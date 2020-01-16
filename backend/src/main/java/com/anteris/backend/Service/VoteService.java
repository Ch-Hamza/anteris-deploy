package com.anteris.backend.Service;

import com.anteris.backend.Message.request.VoteForm;
import com.anteris.backend.Message.response.VoteOptionResponse;
import com.anteris.backend.Message.response.VoteOptionResult;
import com.anteris.backend.Message.response.VoteResponse;
import com.anteris.backend.Model.*;
import com.anteris.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VoteService {

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    VoteOptionRepository voteOptionRepository;

    @Autowired
    VoteResultRepository voteResultRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<List<VoteResponse>> findAll() {
        try {
            List<Vote> votes = voteRepository.findByEnabled(true);
            List<VoteResponse> voteResponses = new ArrayList<>();
            if(votes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            votes.forEach(vote -> {
                VoteResponse voteResponse = setResponse(vote);
                voteResponses.add(voteResponse);
            });

            return new ResponseEntity<>(voteResponses, HttpStatus.OK);

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<VoteResponse> findById(long id) {

        Optional<Vote> voteOptional = voteRepository.findByIdAndEnabled(id, true);
        if(voteOptional.isPresent()) {
            Vote vote = voteOptional.get();
            VoteResponse voteResponse = setResponse(vote);
            return new ResponseEntity<>(voteResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> createVote(VoteResponse voteResponse) {

        Vote vote = new Vote();
        vote.setEnabled(true);
        vote = setData(vote, voteResponse);
        return new ResponseEntity<>(vote, HttpStatus.OK);
    }

    public ResponseEntity<?> updateVote(VoteResponse voteResponse) {

        Optional<Vote> voteOptional = voteRepository.findByIdAndEnabled(voteResponse.getId(), true);
        if(voteOptional.isPresent()) {
            Vote vote = voteOptional.get();
            vote = edit(vote, voteResponse);
            return new ResponseEntity<>(vote, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> vote(VoteForm voteForm) {
        Optional<VoteOption> voteOptionOptional = voteOptionRepository.findById(voteForm.getVote_option_id());
        Optional<User> userOptional = userRepository.findByIdAndEnabled(voteForm.getUser_id(), true);

        if(voteOptionOptional.isPresent() && userOptional.isPresent()) {
            VoteOption voteOption = voteOptionOptional.get();
            User user = userOptional.get();

            Optional<Vote> voteOptional = voteRepository.findByIdAndEnabled(voteOption.getVote().getId(), true);
            Vote vote = voteOptional.get();

            VoteResult voteResult = new VoteResult();
            Optional<VoteResult> voteResultOptional = voteResultRepository.findVoteResultByVoteOption_Vote_IdAndUser_Id(
                    vote.getId(), user.getId());
            if(voteResultOptional.isPresent()) {
                voteResult = voteResultOptional.get();
                voteResult.setVoteOption(voteOption);
                /*return new ResponseEntity<>(new ResponseMessage("Fail -> this user already voted!"),
                        HttpStatus.BAD_REQUEST);*/
            } else {
                voteResult.setUser(user);
                voteResult.setVoteOption(voteOption);
            }

            voteResultRepository.save(voteResult);
            return new ResponseEntity<>(vote, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<String> removeVote(long id) {

        Optional<Vote> voteOptional = voteRepository.findByIdAndEnabled(id, true);
        if(voteOptional.isPresent()) {
            Vote vote = voteOptional.get();
            vote.setEnabled(false);
            voteRepository.save(vote);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    private Vote setData(Vote vote, VoteResponse voteResponse) {
        vote.setTitle(voteResponse.getTitle());
        vote.setDescription(voteResponse.getDescription());
        vote.setStartDate(voteResponse.getStart_date());
        vote.setEndDate(voteResponse.getEnd_date());

        List<String> role_restriction = voteResponse.getRole_restriction();
        Set<Role> roles = new HashSet<>();
        role_restriction.forEach(role -> {
            Role roleDb = roleRepository.findByName(RoleName.valueOf(role))
                    .orElseThrow(() -> new RuntimeException("Fail! -> Cause: Role not found."));
            roles.add(roleDb);
        });
        vote.setRole_restriction(roles);

        voteRepository.save(vote);

        List<VoteOptionResponse> voteOptionResponses = voteResponse.getVoteOptionResponses();
        voteOptionResponses.forEach(voteOptionResponse -> {
            VoteOption voteOption = new VoteOption();
            voteOption.setTitle(voteOptionResponse.getTitle());
            voteOption.setVote(vote);
            voteOptionRepository.save(voteOption);
        });

        return vote;
    }

    private VoteResponse setResponse(Vote vote) {
        VoteResponse voteResponse = new VoteResponse();
        voteResponse.setId(vote.getId());
        voteResponse.setTitle(vote.getTitle());
        voteResponse.setDescription(vote.getDescription());
        voteResponse.setStart_date(vote.getStartDate());
        voteResponse.setEnd_date(vote.getEndDate());

        List<String> roles = new ArrayList<>();
        vote.getRole_restriction().forEach(role -> {
            roles.add(role.getName().name());
        });
        voteResponse.setRole_restriction(roles);

        List<VoteOptionResponse> voteOptionResponses = new ArrayList<>();
        List<VoteOptionResult> options = new ArrayList<>();

        List<VoteOption> voteOptions = voteOptionRepository.findVoteOptionByVote_Id(vote.getId());
        voteOptions.forEach(voteOption -> {
            VoteOptionResponse voteOptionResponse = new VoteOptionResponse();
            voteOptionResponse.setId(voteOption.getId());
            voteOptionResponse.setTitle(voteOption.getTitle());

            VoteOptionResult voteOptionResult = new VoteOptionResult();
            voteOptionResult.setId(voteOption.getId());
            voteOptionResult.setTitle(voteOption.getTitle());
            voteOptionResult.setTotal_votes(0);

            Optional<VoteResult> voteResultOptional = voteResultRepository.findVoteResultByVoteOption_IdAndVoteOption_Vote_Id(voteOption.getId(), vote.getId());
            if(voteResultOptional.isPresent()) {
                User user = voteResultOptional.get().getUser();
                voteOptionResponse.setUser_id(user.getId());
                voteOptionResponses.add(voteOptionResponse);

                int total_votes = voteOptionResult.getTotal_votes();
                voteOptionResult.setTotal_votes(total_votes + 1);
            }
            options.add(voteOptionResult);
        });
        voteResponse.setVoteOptionResponses(voteOptionResponses);
        voteResponse.setVote_options(options);

        return voteResponse;
    }

    private Vote edit(Vote vote, VoteResponse voteResponse) {
        vote.setTitle(voteResponse.getTitle());
        vote.setDescription(voteResponse.getDescription());
        vote.setStartDate(voteResponse.getStart_date());
        vote.setEndDate(voteResponse.getEnd_date());

        Set<Role> roles = new HashSet<>();
        voteResponse.getRole_restriction().forEach(role -> {
            Optional<Role> roleDB = roleRepository.findByName(RoleName.valueOf(role));
            roleDB.ifPresent(roles::add);
        });
        vote.setRole_restriction(roles);

        //vote options
        List<VoteOptionResult> options = voteResponse.getVote_options();
        options.forEach(option -> {
            Optional<VoteOption> optionDBOptional = voteOptionRepository.findById(option.getId());
            if(optionDBOptional.isPresent()) {
                VoteOption voteOption = optionDBOptional.get();
                if(!voteOption.getTitle().equals(option.getTitle())) {
                    voteOption.setTitle(option.getTitle());
                    voteOptionRepository.save(voteOption);
                }
            }
        });

        voteRepository.save(vote);
        return vote;
    }
}
