package com.anteris.backend.Repository;

import com.anteris.backend.Model.MeetingInvitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeetingInvitationRepository extends JpaRepository<MeetingInvitation, Long> {
    List<MeetingInvitation> findMeetingInvitationByMeeting_Id(long meeting_id);
    Optional<MeetingInvitation> findMeetingInvitationByUser_IdAndMeeting_Id(long user_id, long meeting_id);
}
