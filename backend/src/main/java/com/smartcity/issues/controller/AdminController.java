package com.smartcity.issues.controller;

import com.smartcity.issues.dto.IssueStatusUpdateRequest;
import com.smartcity.issues.dto.NotificationRequest;
import com.smartcity.issues.entity.Issue;
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
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final IssueService issueService;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public AdminController(IssueService issueService, NotificationService notificationService, UserRepository userRepository) {
        this.issueService = issueService;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> allIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @PatchMapping("/issues/{issueId}/status")
    public ResponseEntity<Issue> updateStatus(@PathVariable Long issueId,
            @Valid @RequestBody IssueStatusUpdateRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(issueService.updateIssueStatus(issueId, request, authentication.getName()));
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> analytics() {
        return ResponseEntity.ok(issueService.analytics());
    }

    @PostMapping("/send-notification")
    public ResponseEntity<Map<String, Object>> sendNotification(@Valid @RequestBody NotificationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        notificationService.createNotification(user, request.getTitle(), request.getMessage());
        return ResponseEntity.ok(Map.of("message", "Notification sent successfully", "userId", user.getId()));
    }
}
