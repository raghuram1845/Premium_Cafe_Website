package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.CafeTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CafeTableRepository extends JpaRepository<CafeTable, Long> {

    Optional<CafeTable> findByTableNumber(Integer tableNumber);

}