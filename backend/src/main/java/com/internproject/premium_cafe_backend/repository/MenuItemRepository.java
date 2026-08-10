package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.Category;
import com.internproject.premium_cafe_backend.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    Optional<MenuItem> findByName(String name);

    boolean existsByCategory(Category category);
}