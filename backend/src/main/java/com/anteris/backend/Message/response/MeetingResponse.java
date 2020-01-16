package com.anteris.backend.Message.response;

import java.util.List;

public class MeetingResponse {

    private long id;
    private String title;
    private String description;
    private String meeting_date;
    private String record_file;
    private List<MeetingUser> user_ids;

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

    public String getMeeting_date() {
        return meeting_date;
    }

    public void setMeeting_date(String meeting_date) {
        this.meeting_date = meeting_date;
    }

    public String getRecord_file() {
        return record_file;
    }

    public void setRecord_file(String record_file) {
        this.record_file = record_file;
    }

    public List<MeetingUser> getUser_ids() {
        return user_ids;
    }

    public void setUser_ids(List<MeetingUser> user_ids) {
        this.user_ids = user_ids;
    }
}
