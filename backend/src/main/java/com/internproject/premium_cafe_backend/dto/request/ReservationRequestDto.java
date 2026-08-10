package com.internproject.premium_cafe_backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationRequestDto {

    @NotNull(message = "Reservation date is required.")
    private LocalDate reservationDate;

    @NotNull(message = "Reservation time is required.")
    private LocalTime reservationTime;

    @NotNull(message = "Number of guests is required.")
    @Positive(message = "Number of guests must be greater than zero.")
    private Integer guests;

    @Size(
            max = 500,
            message = "Special request cannot exceed 500 characters."
    )
    private String specialRequest;

    @NotNull(message = "Cafe table ID is required.")
    @Positive(message = "Cafe table ID must be greater than zero.")
    private Long cafeTableId;
}