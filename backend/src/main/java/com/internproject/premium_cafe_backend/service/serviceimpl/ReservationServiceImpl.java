package com.internproject.premium_cafe_backend.service.serviceimpl;

import com.internproject.premium_cafe_backend.constants.AppConstants;
import com.internproject.premium_cafe_backend.dto.request.ReservationRequestDto;
import com.internproject.premium_cafe_backend.dto.response.ReservationResponseDto;
import com.internproject.premium_cafe_backend.entity.CafeTable;
import com.internproject.premium_cafe_backend.entity.Reservation;
import com.internproject.premium_cafe_backend.entity.User;
import com.internproject.premium_cafe_backend.enums.ReservationStatus;
import com.internproject.premium_cafe_backend.exception.DuplicateResourceException;
import com.internproject.premium_cafe_backend.exception.InvalidRequestException;
import com.internproject.premium_cafe_backend.exception.ResourceNotFoundException;
import com.internproject.premium_cafe_backend.mapper.ReservationMapper;
import com.internproject.premium_cafe_backend.repository.CafeTableRepository;
import com.internproject.premium_cafe_backend.repository.ReservationRepository;
import com.internproject.premium_cafe_backend.repository.UserRepository;
import com.internproject.premium_cafe_backend.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final CafeTableRepository cafeTableRepository;

    @Override
    public ReservationResponseDto createReservation(ReservationRequestDto request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id : "
                                + request.getUserId()));

        CafeTable cafeTable = cafeTableRepository.findById(request.getCafeTableId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Table not found with id : "
                                + request.getCafeTableId()));

        if (request.getReservationDate().isBefore(LocalDate.now())) {
            throw new InvalidRequestException("Reservation date cannot be in the past.");
        }
        if (request.getReservationDate().isEqual(LocalDate.now())
                && request.getReservationTime().isBefore(LocalTime.now())) {

            throw new InvalidRequestException(
                    "Reservation time cannot be in the past.");
        }

        if (request.getGuests() <= 0) {
            throw new InvalidRequestException("Guests must be greater than zero.");
        }

        if (request.getGuests() > cafeTable.getCapacity()) {
            throw new InvalidRequestException(
                    "Number of guests exceeds table capacity.");
        }

        List<Reservation> reservations =
                reservationRepository.findByCafeTableAndReservationDate(
                        cafeTable,
                        request.getReservationDate());

        for (Reservation reservation : reservations) {

            LocalTime existingStart = reservation.getReservationTime();
            LocalTime existingEnd =
                    existingStart.plusHours(AppConstants.RESERVATION_DURATION_HOURS);

            LocalTime requestedStart = request.getReservationTime();
            LocalTime requestedEnd =
                    requestedStart.plusHours(AppConstants.RESERVATION_DURATION_HOURS);

            if (requestedStart.isBefore(existingEnd)
                    && requestedEnd.isAfter(existingStart)) {

                throw new DuplicateResourceException(
                        "Table is already reserved during this time.");
            }
        }

        Reservation reservation = ReservationMapper.toEntity(request);

        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setUser(user);
        reservation.setCafeTable(cafeTable);

        Reservation savedReservation =
                reservationRepository.save(reservation);

        return ReservationMapper.toResponse(savedReservation);
    }

    @Override
    public List<ReservationResponseDto> getAllReservations() {

        return reservationRepository.findAll()
                .stream()
                .map(ReservationMapper::toResponse)
                .toList();
    }

    @Override
    public ReservationResponseDto getReservationById(Long id) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Reservation not found with id : " + id));

        return ReservationMapper.toResponse(reservation);
    }

    @Override
    public ReservationResponseDto updateReservation(Long id,
                                                    ReservationRequestDto request) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Reservation not found with id : " + id));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id : " + request.getUserId()));

        CafeTable cafeTable = cafeTableRepository.findById(request.getCafeTableId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Table not found with id : " + request.getCafeTableId()));

        if (request.getReservationDate().isBefore(LocalDate.now())) {
            throw new InvalidRequestException(
                    "Reservation date cannot be in the past.");
        }

        if (request.getReservationDate().isEqual(LocalDate.now())
                && request.getReservationTime().isBefore(LocalTime.now())) {

            throw new InvalidRequestException(
                    "Reservation time cannot be in the past.");
        }

        if (request.getGuests() <= 0) {
            throw new InvalidRequestException(
                    "Guests must be greater than zero.");
        }

        if (request.getGuests() > cafeTable.getCapacity()) {
            throw new InvalidRequestException(
                    "Number of guests exceeds table capacity.");
        }

        List<Reservation> reservations =
                reservationRepository.findByCafeTableAndReservationDate(
                        cafeTable,
                        request.getReservationDate());

        LocalTime requestedStart = request.getReservationTime();
        LocalTime requestedEnd =
                requestedStart.plusHours(AppConstants.RESERVATION_DURATION_HOURS);

        for (Reservation existingReservation : reservations) {

            // Skip the reservation currently being updated
            if (existingReservation.getId().equals(id)) {
                continue;
            }

            LocalTime existingStart = existingReservation.getReservationTime();
            LocalTime existingEnd =
                    existingStart.plusHours(AppConstants.RESERVATION_DURATION_HOURS);

            if (requestedStart.isBefore(existingEnd)
                    && requestedEnd.isAfter(existingStart)) {

                throw new DuplicateResourceException(
                        "Table is already reserved during this time.");
            }
        }

        reservation.setReservationDate(request.getReservationDate());
        reservation.setReservationTime(request.getReservationTime());
        reservation.setGuests(request.getGuests());
        reservation.setSpecialRequest(request.getSpecialRequest());
        reservation.setUser(user);
        reservation.setCafeTable(cafeTable);
        reservation.setUpdatedAt(LocalDateTime.now());

        Reservation updatedReservation =
                reservationRepository.save(reservation);

        return ReservationMapper.toResponse(updatedReservation);
    }

    @Override
    public void deleteReservation(Long id) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Reservation not found with id : " + id));

        reservationRepository.delete(reservation);
    }
}