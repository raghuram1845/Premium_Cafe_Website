package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}