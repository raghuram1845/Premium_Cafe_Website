package com.internproject.premium_cafe_backend.service.serviceimpl;

import com.internproject.premium_cafe_backend.dto.request.MenuItemRequestDto;
import com.internproject.premium_cafe_backend.dto.response.MenuItemResponseDto;
import com.internproject.premium_cafe_backend.entity.Category;
import com.internproject.premium_cafe_backend.entity.MenuItem;
import com.internproject.premium_cafe_backend.exception.DuplicateResourceException;
import com.internproject.premium_cafe_backend.exception.ResourceNotFoundException;
import com.internproject.premium_cafe_backend.mapper.MenuItemMapper;
import com.internproject.premium_cafe_backend.repository.CategoryRepository;
import com.internproject.premium_cafe_backend.repository.MenuItemRepository;
import com.internproject.premium_cafe_backend.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public MenuItemResponseDto createMenuItem(MenuItemRequestDto request) {

        if (menuItemRepository.findByName(request.getName()).isPresent()) {
            throw new DuplicateResourceException("Menu item already exists.");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found with id : " + request.getCategoryId()));

        MenuItem menuItem = MenuItemMapper.toEntity(request);

        menuItem.setCategory(category);

        MenuItem savedMenuItem = menuItemRepository.save(menuItem);

        return MenuItemMapper.toResponse(savedMenuItem);
    }

    @Override
    public List<MenuItemResponseDto> getAllMenuItems() {

        return menuItemRepository.findAll()
                .stream()
                .map(MenuItemMapper::toResponse)
                .toList();
    }

    @Override
    public MenuItemResponseDto getMenuItemById(Long id) {

        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Menu item not found with id : " + id));

        return MenuItemMapper.toResponse(menuItem);
    }

    @Override
    public MenuItemResponseDto updateMenuItem(Long id, MenuItemRequestDto request) {

        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Menu item not found with id : " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found with id : "
                                + request.getCategoryId()));

        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setImageUrl(request.getImageUrl());
        menuItem.setAvailability(request.getAvailability());
        menuItem.setCategory(category);
        menuItem.setUpdatedAt(LocalDateTime.now());

        MenuItem updatedMenuItem = menuItemRepository.save(menuItem);

        return MenuItemMapper.toResponse(updatedMenuItem);
    }

    @Override
    public void deleteMenuItem(Long id) {

        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Menu item not found with id : " + id));

        menuItemRepository.delete(menuItem);
    }
}