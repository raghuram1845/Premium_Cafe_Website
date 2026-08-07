package com.internproject.premium_cafe_backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponseDto {

    private Long id;

    private String title;

    private String description;

    private String imageUrl;

    private LocalDate startDate;

    private LocalDate endDate;

    private BigDecimal discount;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}