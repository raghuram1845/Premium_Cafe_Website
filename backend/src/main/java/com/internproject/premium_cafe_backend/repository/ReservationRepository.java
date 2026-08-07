package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.CafeTable;
import com.internproject.premium_cafe_backend.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByCafeTableAndReservationDate(
            CafeTable cafeTable,
            LocalDate reservationDate
    );

}