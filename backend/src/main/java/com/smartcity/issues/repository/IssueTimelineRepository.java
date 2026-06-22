package com.smartcity.issues.repository;

import com.smartcity.issues.entity.Issue;
import com.smartcity.issues.entity.IssueTimeline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueTimelineRepository extends JpaRepository<IssueTimeline, Long> {
    List<IssueTimeline> findByIssueOrderByChangedAtAsc(Issue issue);
}
