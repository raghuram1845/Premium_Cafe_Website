package com.internproject.premium_cafe_backend.mapper;

import com.internproject.premium_cafe_backend.dto.request.ReservationRequestDto;
import com.internproject.premium_cafe_backend.dto.response.ReservationResponseDto;
import com.internproject.premium_cafe_backend.entity.Reservation;
import com.internproject.premium_cafe_backend.enums.ReservationStatus;

import java.time.LocalDateTime;

public class ReservationMapper {

    public static Reservation toEntity(ReservationRequestDto dto) {

        LocalDateTime now = LocalDateTime.now();

        return Reservation.builder()
                .reservationDate(dto.getReservationDate())
                .reservationTime(dto.getReservationTime())
                .guests(dto.getGuests())
                .specialRequest(dto.getSpecialRequest())
                .status(ReservationStatus.PENDING)
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public static ReservationResponseDto toResponse(Reservation reservation) {

        return ReservationResponseDto.builder()
                .id(reservation.getId())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .guests(reservation.getGuests())
                .specialRequest(reservation.getSpecialRequest())
                .status(reservation.getStatus())
                .userId(reservation.getUser().getId())
                .userName(reservation.getUser().getFullName())
                .cafeTableId(reservation.getCafeTable().getId())
                .tableNumber(reservation.getCafeTable().getTableNumber())
                .createdAt(reservation.getCreatedAt())
                .updatedAt(reservation.getUpdatedAt())
                .build();
    }
}
