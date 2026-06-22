package com.smartcity.issues.dto;

import com.smartcity.issues.entity.IssueStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueStatusUpdateRequest {
    @NotNull
    private IssueStatus status;

    @NotBlank
    private String comment;

    private String assignedDepartment;
    private String assignedOfficer;
}
