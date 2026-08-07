package com.internproject.premium_cafe_backend.service;

import com.internproject.premium_cafe_backend.dto.request.CategoryRequestDto;
import com.internproject.premium_cafe_backend.dto.response.CategoryResponseDto;

import java.util.List;

public interface CategoryService {

    CategoryResponseDto createCategory(CategoryRequestDto request);

    List<CategoryResponseDto> getAllCategories();

    CategoryResponseDto getCategoryById(Long id);

    CategoryResponseDto updateCategory(Long id, CategoryRequestDto request);

    void deleteCategory(Long id);
}
