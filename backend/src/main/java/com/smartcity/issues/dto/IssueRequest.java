package com.smartcity.issues.dto;

import com.smartcity.issues.entity.IssueCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private IssueCategory category;

    private String imageUrl;
    private String address;
    private Double latitude;
    private Double longitude;
}
