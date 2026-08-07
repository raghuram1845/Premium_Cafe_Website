package com.internproject.premium_cafe_backend.dto.request;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationRequestDto {

    private LocalDate reservationDate;

    private LocalTime reservationTime;

    private Integer guests;

    private String specialRequest;

    private Long userId;

    private Long cafeTableId;
}
