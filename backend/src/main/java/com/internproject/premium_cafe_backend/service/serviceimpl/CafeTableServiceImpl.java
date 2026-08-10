package com.internproject.premium_cafe_backend.service.serviceimpl;

import com.internproject.premium_cafe_backend.dto.request.CafeTableRequestDto;
import com.internproject.premium_cafe_backend.dto.response.CafeTableResponseDto;
import com.internproject.premium_cafe_backend.entity.CafeTable;
import com.internproject.premium_cafe_backend.exception.DuplicateResourceException;
import com.internproject.premium_cafe_backend.exception.InvalidRequestException;
import com.internproject.premium_cafe_backend.exception.ResourceNotFoundException;
import com.internproject.premium_cafe_backend.mapper.CafeTableMapper;
import com.internproject.premium_cafe_backend.repository.CafeTableRepository;
import com.internproject.premium_cafe_backend.repository.ReservationRepository;
import com.internproject.premium_cafe_backend.service.CafeTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.internproject.premium_cafe_backend.constants.AppConstants;
import com.internproject.premium_cafe_backend.entity.Reservation;
import com.internproject.premium_cafe_backend.enums.TableStatus;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CafeTableServiceImpl implements CafeTableService {

    private final CafeTableRepository cafeTableRepository;
    private final ReservationRepository reservationRepository;

    @Override
    public CafeTableResponseDto createCafeTable(CafeTableRequestDto request) {

        if (cafeTableRepository.findByTableNumber(request.getTableNumber()).isPresent()) {
            throw new DuplicateResourceException("Table number already exists.");
        }

        if (request.getCapacity() <= 0) {
            throw new InvalidRequestException("Capacity must be greater than zero.");
        }

        CafeTable cafeTable = CafeTableMapper.toEntity(request);

        CafeTable savedCafeTable = cafeTableRepository.save(cafeTable);

        return CafeTableMapper.toResponse(savedCafeTable);
    }

    @Override
    public List<CafeTableResponseDto> getAllCafeTables() {

        return cafeTableRepository.findAll()
                .stream()
                .map(CafeTableMapper::toResponse)
                .toList();
    }

    @Override
    public CafeTableResponseDto getCafeTableById(Long id) {

        CafeTable cafeTable = cafeTableRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Table not found with id : " + id));

        return CafeTableMapper.toResponse(cafeTable);
    }

    @Override
    public CafeTableResponseDto updateCafeTable(Long id,
                                                CafeTableRequestDto request) {

        CafeTable cafeTable = cafeTableRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Table not found with id : " + id));

        if (request.getCapacity() <= 0) {
            throw new InvalidRequestException("Capacity must be greater than zero.");
        }

        Optional<CafeTable> existingTable =
                cafeTableRepository.findByTableNumber(request.getTableNumber());

        if (existingTable.isPresent() &&
                !existingTable.get().getId().equals(id)) {

            throw new DuplicateResourceException("Table number already exists.");
        }

        cafeTable.setTableNumber(request.getTableNumber());
        cafeTable.setCapacity(request.getCapacity());
        cafeTable.setStatus(request.getStatus());
        cafeTable.setUpdatedAt(LocalDateTime.now());

        CafeTable updatedCafeTable = cafeTableRepository.save(cafeTable);

        return CafeTableMapper.toResponse(updatedCafeTable);
    }

    @Override
    public void deleteCafeTable(Long id) {

        CafeTable cafeTable = cafeTableRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Table not found with id : " + id));

        if (reservationRepository.existsByCafeTable(cafeTable)) {
            throw new InvalidRequestException(
                    "Cannot delete table because reservations are associated with it.");
        }
        cafeTableRepository.delete(cafeTable);
    }

    @Override
    public List<CafeTableResponseDto> getAvailableTables(
            LocalDate date,
            LocalTime time,
            Integer guests) {

        if (date == null || time == null) {
            throw new InvalidRequestException(
                    "Date and time are required."
            );
        }

        if (guests == null || guests <= 0) {
            throw new InvalidRequestException(
                    "Guests must be greater than zero."
            );
        }

        if (date.isBefore(LocalDate.now())) {
            throw new InvalidRequestException(
                    "Reservation date cannot be in the past."
            );
        }

        if (date.isEqual(LocalDate.now())
                && time.isBefore(LocalTime.now())) {

            throw new InvalidRequestException(
                    "Reservation time cannot be in the past."
            );
        }

        List<CafeTable> tables = cafeTableRepository.findAll();

        return tables.stream()
                .filter(table ->
                        table.getStatus() == TableStatus.AVAILABLE
                )
                .filter(table ->
                        table.getCapacity() >= guests
                )
                .filter(table -> {

                    List<Reservation> reservations =
                            reservationRepository
                                    .findByCafeTableAndReservationDate(
                                            table,
                                            date
                                    );

                    LocalTime requestedStart = time;

                    LocalTime requestedEnd =
                            requestedStart.plusHours(
                                    AppConstants.RESERVATION_DURATION_HOURS
                            );

                    return reservations.stream().noneMatch(
                            reservation -> {

                                LocalTime existingStart =
                                        reservation.getReservationTime();

                                LocalTime existingEnd =
                                        existingStart.plusHours(
                                                AppConstants.RESERVATION_DURATION_HOURS
                                        );

                                return requestedStart.isBefore(existingEnd)
                                        && requestedEnd.isAfter(existingStart);
                            }
                    );
                })
                .map(CafeTableMapper::toResponse)
                .toList();
    }
}
