package com.internproject.premium_cafe_backend.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventRequestDto {

    private String title;

    private String description;

    private String imageUrl;

    private LocalDate startDate;

    private LocalDate endDate;

    private BigDecimal discount;

    private Boolean active;
}