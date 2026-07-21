package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
