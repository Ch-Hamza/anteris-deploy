package com.anteris.backend.Repository;

import com.anteris.backend.Model.MeetingRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRecordRepository extends JpaRepository<MeetingRecord, Long> {
}
