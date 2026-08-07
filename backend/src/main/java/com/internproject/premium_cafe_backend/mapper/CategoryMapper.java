package com.internproject.premium_cafe_backend.mapper;

import com.internproject.premium_cafe_backend.dto.request.CategoryRequestDto;
import com.internproject.premium_cafe_backend.dto.response.CategoryResponseDto;
import com.internproject.premium_cafe_backend.entity.Category;

import java.time.LocalDateTime;

public class CategoryMapper {

    public static Category toEntity(CategoryRequestDto dto) {

        LocalDateTime now = LocalDateTime.now();

        return Category.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public static CategoryResponseDto toResponse(Category category) {

        return CategoryResponseDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}