package com.anteris.backend.Message.response;

import java.util.List;

public class VoteResponse {

    private long id;
    private String title;
    private String description;
    private String start_date;
    private String end_date;
    private List<String> role_restriction;
    private List<VoteOptionResult> vote_options;
    private List<VoteOptionResponse> voteOptionResponses;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getRole_restriction() {
        return role_restriction;
    }

    public void setRole_restriction(List<String> role_restriction) {
        this.role_restriction = role_restriction;
    }

    public List<VoteOptionResponse> getVoteOptionResponses() {
        return voteOptionResponses;
    }

    public void setVoteOptionResponses(List<VoteOptionResponse> voteOptionResponses) {
        this.voteOptionResponses = voteOptionResponses;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public List<VoteOptionResult> getVote_options() {
        return vote_options;
    }

    public void setVote_options(List<VoteOptionResult> vote_options) {
        this.vote_options = vote_options;
    }
}
