package com.smartcity.repository;

import com.smartcity.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByUserId(Long userId);

    List<Issue> findByStatus(String status);

    List<Issue> findByCategory(String category);
}
