package com.internproject.premium_cafe_backend.mapper;

import com.internproject.premium_cafe_backend.dto.request.MenuItemRequestDto;
import com.internproject.premium_cafe_backend.dto.response.MenuItemResponseDto;
import com.internproject.premium_cafe_backend.entity.MenuItem;

import java.time.LocalDateTime;

public class MenuItemMapper {
    public static MenuItem toEntity(MenuItemRequestDto dto) {

        LocalDateTime now = LocalDateTime.now();

        return MenuItem.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .imageUrl(dto.getImageUrl())
                .availability(dto.getAvailability())
                .createdAt(now)
                .updatedAt(now)
                .build();
    }
    public static MenuItemResponseDto toResponse(MenuItem menuItem) {

        return MenuItemResponseDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .availability(menuItem.getAvailability())
                .categoryId(menuItem.getCategory().getId())
                .categoryName(menuItem.getCategory().getName())
                .createdAt(menuItem.getCreatedAt())
                .updatedAt(menuItem.getUpdatedAt())
                .build();
    }

}
