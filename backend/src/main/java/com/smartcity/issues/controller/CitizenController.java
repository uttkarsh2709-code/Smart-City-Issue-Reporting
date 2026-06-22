package com.smartcity.issues.controller;

import com.smartcity.issues.dto.FeedbackRequest;
import com.smartcity.issues.dto.IssueRequest;
import com.smartcity.issues.entity.Feedback;
import com.smartcity.issues.entity.Issue;
import com.smartcity.issues.entity.IssueTimeline;
import com.smartcity.issues.entity.Notification;
import com.smartcity.issues.entity.User;
import com.smartcity.issues.repository.UserRepository;
import com.smartcity.issues.service.IssueService;
import com.smartcity.issues.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/citizen")
@PreAuthorize("hasRole('CITIZEN')")
public class CitizenController {

    private final IssueService issueService;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public CitizenController(IssueService issueService,
            NotificationService notificationService,
            UserRepository userRepository) {
        this.issueService = issueService;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/issues")
    public ResponseEntity<Issue> reportIssue(@Valid @RequestBody IssueRequest request, Authentication authentication) {
        User citizen = currentUser(authentication);
        return ResponseEntity.ok(issueService.reportIssue(citizen, request));
    }

    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> myIssues(Authentication authentication) {
        User citizen = currentUser(authentication);
        return ResponseEntity.ok(issueService.getCitizenIssues(citizen));
    }

    @GetMapping("/issues/{issueId}/timeline")
    public ResponseEntity<List<IssueTimeline>> timeline(@PathVariable Long issueId) {
        return ResponseEntity.ok(issueService.getIssueTimeline(issueId));
    }

    @PostMapping("/issues/{issueId}/feedback")
    public ResponseEntity<Map<String, Object>> feedback(@PathVariable Long issueId,
            @Valid @RequestBody FeedbackRequest request,
            Authentication authentication) {
        User citizen = currentUser(authentication);
        Feedback saved = issueService.submitFeedback(issueId, request, citizen);
        return ResponseEntity.ok(Map.of("id", saved.getId(), "message", "Feedback submitted"));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> notifications(Authentication authentication) {
        User citizen = currentUser(authentication);
        return ResponseEntity.ok(notificationService.getUserNotifications(citizen));
    }

    private User currentUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found"));
    }
}
