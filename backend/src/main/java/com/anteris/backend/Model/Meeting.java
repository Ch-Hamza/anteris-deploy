package com.anteris.backend.Model;

import javax.persistence.*;

@Entity
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 10000)
    private String description;

    private String meetingDate;
    private boolean enabled;

    @OneToOne(targetEntity = MeetingRecord.class, fetch = FetchType.EAGER)
    private MeetingRecord meetingRecord;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(String meetingDate) {
        this.meetingDate = meetingDate;
    }

    public MeetingRecord getMeetingRecord() {
        return meetingRecord;
    }

    public void setMeetingRecord(MeetingRecord meetingRecord) {
        this.meetingRecord = meetingRecord;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
