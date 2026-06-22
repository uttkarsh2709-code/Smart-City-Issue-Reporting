package com.smartcity.issues.repository;

import com.smartcity.issues.entity.Issue;
import com.smartcity.issues.entity.IssueStatus;
import com.smartcity.issues.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByReportedByOrderByCreatedAtDesc(User user);

    long countByStatus(IssueStatus status);
}
