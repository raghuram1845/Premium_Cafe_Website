package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByTitle(String title);

}