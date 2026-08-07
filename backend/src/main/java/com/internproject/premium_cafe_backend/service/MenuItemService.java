package com.internproject.premium_cafe_backend.service;

import com.internproject.premium_cafe_backend.dto.request.MenuItemRequestDto;
import com.internproject.premium_cafe_backend.dto.response.MenuItemResponseDto;

import java.util.List;

public interface MenuItemService {

    MenuItemResponseDto createMenuItem(MenuItemRequestDto request);

    List<MenuItemResponseDto> getAllMenuItems();

    MenuItemResponseDto getMenuItemById(Long id);

    MenuItemResponseDto updateMenuItem(Long id, MenuItemRequestDto request);

    void deleteMenuItem(Long id);
}
