package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}
