package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

}