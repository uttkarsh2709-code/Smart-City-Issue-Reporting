package com.smartcity.issues.service;

import com.smartcity.issues.dto.FeedbackRequest;
import com.smartcity.issues.dto.IssueRequest;
import com.smartcity.issues.dto.IssueStatusUpdateRequest;
import com.smartcity.issues.entity.*;
import com.smartcity.issues.repository.FeedbackRepository;
import com.smartcity.issues.repository.IssueRepository;
import com.smartcity.issues.repository.IssueTimelineRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueTimelineRepository issueTimelineRepository;
    private final FeedbackRepository feedbackRepository;
    private final NotificationService notificationService;

    public IssueService(IssueRepository issueRepository,
            IssueTimelineRepository issueTimelineRepository,
            FeedbackRepository feedbackRepository,
            NotificationService notificationService) {
        this.issueRepository = issueRepository;
        this.issueTimelineRepository = issueTimelineRepository;
        this.feedbackRepository = feedbackRepository;
        this.notificationService = notificationService;
    }

    public Issue reportIssue(User citizen, IssueRequest request) {
        Issue issue = new Issue();
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setCategory(request.getCategory());
        issue.setImageUrl(request.getImageUrl());
        issue.setAddress(request.getAddress());
        issue.setLatitude(request.getLatitude());
        issue.setLongitude(request.getLongitude());
        issue.setReportedBy(citizen);
        Issue saved = issueRepository.save(issue);

        addTimeline(saved, saved.getStatus(), "Issue reported", citizen.getFullName());
        notificationService.createNotification(citizen, "Issue Submitted",
                "Your issue #" + saved.getId() + " has been submitted.");
        return saved;
    }

    public List<Issue> getCitizenIssues(User citizen) {
        return issueRepository.findByReportedByOrderByCreatedAtDesc(citizen);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Issue updateIssueStatus(Long issueId, IssueStatusUpdateRequest request, String changedBy) {
        Issue issue = issueRepository.findById(issueId == null ? 0 : issueId)
                .orElseThrow(() -> new IllegalArgumentException("Issue not found"));

        issue.setStatus(request.getStatus());
        if (request.getAssignedDepartment() != null) {
            issue.setAssignedDepartment(request.getAssignedDepartment());
        }
        if (request.getAssignedOfficer() != null) {
            issue.setAssignedOfficer(request.getAssignedOfficer());
        }
        issue.setUpdatedAt(LocalDateTime.now());
        Issue saved = issueRepository.save(issue);

        addTimeline(saved, request.getStatus(), request.getComment(), changedBy);

        String replyMessage = "Issue #" + saved.getId() + " is now " + saved.getStatus();
        if (request.getComment() != null && !request.getComment().isBlank()) {
            replyMessage += ". Reply: " + request.getComment().trim();
        }

        notificationService.createNotification(
            saved.getReportedBy(),
            "Admin Reply",
            replyMessage);

        return saved;
    }

    public List<IssueTimeline> getIssueTimeline(Long issueId) {
        Issue issue = issueRepository.findById(issueId == null ? 0 : issueId)
                .orElseThrow(() -> new IllegalArgumentException("Issue not found"));
        return issueTimelineRepository.findByIssueOrderByChangedAtAsc(issue);
    }

    public Feedback submitFeedback(Long issueId, FeedbackRequest request, User citizen) {
        Issue issue = issueRepository.findById(issueId == null ? 0 : issueId)
                .orElseThrow(() -> new IllegalArgumentException("Issue not found"));

        if (issue.getStatus() != IssueStatus.RESOLVED) {
            throw new IllegalArgumentException("Feedback can only be submitted for resolved issues");
        }

        Feedback feedback = new Feedback();
        feedback.setIssue(issue);
        feedback.setCitizen(citizen);
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        return feedbackRepository.save(feedback);
    }

    public Map<String, Object> analytics() {
        long total = issueRepository.count();
        long open = issueRepository.countByStatus(IssueStatus.OPEN);
        long assigned = issueRepository.countByStatus(IssueStatus.ASSIGNED);
        long inProgress = issueRepository.countByStatus(IssueStatus.IN_PROGRESS);
        long resolved = issueRepository.countByStatus(IssueStatus.RESOLVED);
        long rejected = issueRepository.countByStatus(IssueStatus.REJECTED);

        double resolutionRate = total == 0 ? 0.0 : ((double) resolved / total) * 100.0;

        Map<String, Object> map = new HashMap<>();
        map.put("total", total);
        map.put("open", open);
        map.put("assigned", assigned);
        map.put("inProgress", inProgress);
        map.put("resolved", resolved);
        map.put("rejected", rejected);
        map.put("resolutionRate", Math.round(resolutionRate * 100.0) / 100.0);
        return map;
    }

    private void addTimeline(Issue issue, IssueStatus status, String comment, String changedBy) {
        IssueTimeline timeline = new IssueTimeline();
        timeline.setIssue(issue);
        timeline.setStatus(status);
        timeline.setComment(comment);
        timeline.setChangedBy(changedBy);
        issueTimelineRepository.save(timeline);
    }
}
