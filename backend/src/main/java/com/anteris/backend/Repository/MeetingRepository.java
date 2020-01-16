package com.anteris.backend.Repository;

import com.anteris.backend.Model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    Optional<Meeting> findMeetingByIdAndEnabled(long id, boolean enabled);
    List<Meeting> findByEnabled(boolean enabled);
}
