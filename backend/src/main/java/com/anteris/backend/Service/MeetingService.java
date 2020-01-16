package com.anteris.backend.Service;

import com.anteris.backend.Message.response.MeetingResponse;
import com.anteris.backend.Message.response.MeetingUser;
import com.anteris.backend.Model.*;
import com.anteris.backend.Repository.MeetingInvitationRepository;
import com.anteris.backend.Repository.MeetingRepository;
import com.anteris.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MeetingService {

    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    MeetingInvitationRepository meetingInvitationRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<List<MeetingResponse>> findAll(long id) {
        try {
            List<Meeting> meetings = meetingRepository.findByEnabled(true);
            List<MeetingResponse> meetingResponses = new ArrayList<>();
            if(meetings.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            meetings.forEach(meeting -> {
                Optional<MeetingInvitation> meetingInvitationOptional = meetingInvitationRepository.findMeetingInvitationByUser_IdAndMeeting_Id(id, meeting.getId());
                if(meetingInvitationOptional.isPresent()) {
                    MeetingResponse meetingResponse = setResponse(meeting);
                    meetingResponses.add(meetingResponse);
                }
            });

            return new ResponseEntity<>(meetingResponses, HttpStatus.OK);

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    private MeetingResponse setResponse(Meeting meeting) {
        MeetingResponse meetingResponse = new MeetingResponse();
        meetingResponse.setId(meeting.getId());
        meetingResponse.setTitle(meeting.getTitle());
        meetingResponse.setDescription(meeting.getDescription());
        meetingResponse.setMeeting_date(meeting.getMeetingDate());
        if(meeting.getMeetingRecord() != null)
        meetingResponse.setRecord_file(meeting.getMeetingRecord().getTitle());

        List<MeetingUser> userIds = new ArrayList<>();
        List<MeetingInvitation> meetingInvitations = meetingInvitationRepository.findMeetingInvitationByMeeting_Id(meeting.getId());
        meetingInvitations.forEach(meetingInvitation -> {
            MeetingUser meetingUser = new MeetingUser();
            meetingUser.setId(meetingInvitation.getUser().getId());
            meetingUser.setFullname(meetingInvitation.getUser().getFirstname() + " " + meetingInvitation.getUser().getLastname());
            userIds.add(meetingUser);
        });
        meetingResponse.setUser_ids(userIds);

        return meetingResponse;
    }

    public ResponseEntity<MeetingResponse> findById(long id) {

        Optional<Meeting> meetingOptional = meetingRepository.findMeetingByIdAndEnabled(id, true);
        if(meetingOptional.isPresent()) {
            Meeting meeting = meetingOptional.get();
            MeetingResponse meetingResponse = setResponse(meeting);
            return new ResponseEntity<>(meetingResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> createMeeting(MeetingResponse meetingResponse) {

        Meeting meeting = new Meeting();
        meeting.setEnabled(true);
        meeting = setData(meeting, meetingResponse);
        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }

    private Meeting setData(Meeting meeting, MeetingResponse meetingResponse) {
        meeting.setTitle(meetingResponse.getTitle());
        meeting.setDescription(meetingResponse.getDescription());
        meeting.setMeetingDate(meetingResponse.getMeeting_date());

        meetingRepository.save(meeting);

        List<MeetingUser> userIds = meetingResponse.getUser_ids();
        userIds.forEach(userId -> {
            MeetingInvitation meetingInvitation = new MeetingInvitation();
            meetingInvitation.setMeeting(meeting);
            User user = userRepository.findById(userId.getId()).get();
            meetingInvitation.setUser(user);

            meetingInvitationRepository.save(meetingInvitation);
        });

        return meeting;
    }

    public ResponseEntity<?> updateMeeting(MeetingResponse meetingResponse) {

        Optional<Meeting> meetingOptional = meetingRepository.findMeetingByIdAndEnabled(meetingResponse.getId(), true);
        if(meetingOptional.isPresent()) {
            Meeting meeting = meetingOptional.get();
            meeting = edit(meeting, meetingResponse);
            return new ResponseEntity<>(meeting, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    private Meeting edit(Meeting meeting, MeetingResponse meetingResponse) {

        meeting.setTitle(meetingResponse.getTitle());
        meeting.setDescription(meetingResponse.getDescription());
        meeting.setMeetingDate(meetingResponse.getMeeting_date());

        List<MeetingUser> userIds = meetingResponse.getUser_ids();
        userIds.forEach(userId -> {
            Optional<MeetingInvitation> meetingInvitationOptional  = meetingInvitationRepository.findMeetingInvitationByUser_IdAndMeeting_Id(userId.getId(), meetingResponse.getId());
            MeetingInvitation meetingInvitation = new MeetingInvitation();
            if(meetingInvitationOptional.isPresent()) {
                meetingInvitation = meetingInvitationOptional.get();
            } else {
                meetingInvitation.setMeeting(meeting);
                User user = userRepository.findById(userId.getId()).get();
                meetingInvitation.setUser(user);
            }
            meetingInvitationRepository.save(meetingInvitation);
        });

        meetingRepository.save(meeting);
        return meeting;
    }

    public ResponseEntity<String> removeMeeting(long id) {

        Optional<Meeting> meetingOptional = meetingRepository.findMeetingByIdAndEnabled(id, true);
        if(meetingOptional.isPresent()) {
            Meeting meeting = meetingOptional.get();
            meeting.setEnabled(false);
            meetingRepository.save(meeting);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
