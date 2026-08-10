package com.internproject.premium_cafe_backend.service;

import com.internproject.premium_cafe_backend.dto.request.ReservationRequestDto;
import com.internproject.premium_cafe_backend.dto.response.ReservationResponseDto;

import java.util.List;

public interface ReservationService {

    ReservationResponseDto createReservation(ReservationRequestDto request);

    List<ReservationResponseDto> getAllReservations();

    ReservationResponseDto getReservationById(Long id);

    ReservationResponseDto updateReservation(Long id,
                                             ReservationRequestDto request);

    void deleteReservation(Long id);

    ReservationResponseDto approveReservation(Long id);
}
