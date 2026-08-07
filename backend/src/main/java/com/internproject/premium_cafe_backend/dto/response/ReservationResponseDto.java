package com.internproject.premium_cafe_backend.dto.response;

import com.internproject.premium_cafe_backend.enums.ReservationStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDto {

    private Long id;

    private LocalDate reservationDate;

    private LocalTime reservationTime;

    private Integer guests;

    private String specialRequest;

    private ReservationStatus status;

    private Long userId;

    private String userName;

    private Long cafeTableId;

    private Integer tableNumber;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
