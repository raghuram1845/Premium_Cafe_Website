package com.internproject.premium_cafe_backend.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventRequestDto {

    @NotBlank(message = "Event title cannot be empty.")
    @Size(max = 150, message = "Event title cannot exceed 150 characters.")
    private String title;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters.")
    private String description;

    private String imageUrl;

    @NotNull(message = "Start date is required.")
    private LocalDate startDate;

    @NotNull(message = "End date is required.")
    private LocalDate endDate;

    @NotNull(message = "Discount is required.")
    @DecimalMin(
            value = "0.0",
            message = "Discount cannot be negative."
    )
    @DecimalMax(
            value = "100.0",
            message = "Discount cannot exceed 100%."
    )
    private BigDecimal discount;

    @NotNull(message = "Active status is required.")
    private Boolean active;
}