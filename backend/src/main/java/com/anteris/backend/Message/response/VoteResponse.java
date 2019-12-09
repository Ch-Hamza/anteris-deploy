package com.anteris.backend.Message.response;

import java.util.List;

public class VoteResponse {

    private long id;
    private String title;
    private String description;
    private List<String> role_restriction;
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
}
