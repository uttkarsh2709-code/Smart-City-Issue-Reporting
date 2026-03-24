package com.smartcity.service;

import com.smartcity.dto.IssueRequest;
import com.smartcity.dto.StatusUpdateRequest;
import com.smartcity.model.Department;
import com.smartcity.model.Issue;
import com.smartcity.model.User;
import com.smartcity.repository.DepartmentRepository;
import com.smartcity.repository.IssueRepository;
import com.smartcity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssueService {

    private static final int MAX_IMAGE_URL_LENGTH = 2000;
    
    @Autowired
    private IssueRepository issueRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DepartmentRepository departmentRepository;
    
    public Issue createIssue(Long userId, IssueRequest request) {
        String imageUrl = normalizeImageUrl(request.getImageUrl());

        Issue issue = new Issue();
        issue.setUserId(userId);
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setCategory(request.getCategory());
        issue.setLocation(request.getLocation());
        issue.setLatitude(request.getLatitude());
        issue.setLongitude(request.getLongitude());
        issue.setImageUrl(imageUrl);
        issue.setStatus("PENDING");
        issue.setPriority("MEDIUM");
        
        return issueRepository.save(issue);
    }
    
    public List<Issue> getAllIssues() {
        List<Issue> issues = issueRepository.findAll();
        enrichIssuesWithUserAndDepartment(issues);
        return issues;
    }
    
    public List<Issue> getIssuesByUser(Long userId) {
        List<Issue> issues = issueRepository.findByUserId(userId);
        enrichIssuesWithUserAndDepartment(issues);
        return issues;
    }
    
    public Issue getIssueById(Long id) {
        Issue issue = issueRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Issue not found"));
        enrichIssueWithUserAndDepartment(issue);
        return issue;
    }
    
    public Issue updateIssueStatus(Long id, StatusUpdateRequest request) {
        Issue issue = issueRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Issue not found"));
        
        issue.setStatus(request.getStatus());
        if (request.getDepartmentId() != null) {
            issue.setDepartmentId(request.getDepartmentId());
        }
        if (request.getPriority() != null) {
            issue.setPriority(request.getPriority());
        }
        issue.setUpdatedAt(LocalDateTime.now());
        
        return issueRepository.save(issue);
    }
    
    public void deleteIssue(Long id) {
        issueRepository.deleteById(id);
    }
    
    private void enrichIssuesWithUserAndDepartment(List<Issue> issues) {
        for (Issue issue : issues) {
            enrichIssueWithUserAndDepartment(issue);
        }
    }
    
    private void enrichIssueWithUserAndDepartment(Issue issue) {
        // Get user name
        userRepository.findById(issue.getUserId()).ifPresent(user -> {
            issue.setUserName(user.getFullName());
        });
        
        // Get department name
        if (issue.getDepartmentId() != null) {
            departmentRepository.findById(issue.getDepartmentId()).ifPresent(dept -> {
                issue.setDepartmentName(dept.getName());
            });
        }
    }

    private String normalizeImageUrl(String imageUrl) {
        if (imageUrl == null) {
            return null;
        }

        String trimmed = imageUrl.trim();
        if (trimmed.isEmpty()) {
            return null;
        }

        if (trimmed.length() > MAX_IMAGE_URL_LENGTH) {
            throw new IllegalArgumentException("Image URL is too long. Please use a shorter direct image link (max 2000 characters).");
        }

        return trimmed;
    }
}
