package com.anteris.backend.Message.request;

public class VoteForm {

    private long vote_option_id;
    private long user_id;

    public long getVote_option_id() {
        return vote_option_id;
    }

    public void setVote_option_id(long vote_option_id) {
        this.vote_option_id = vote_option_id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }
}
