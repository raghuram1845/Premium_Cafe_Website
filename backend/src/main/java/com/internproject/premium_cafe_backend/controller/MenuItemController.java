package com.internproject.premium_cafe_backend.controller;

import com.internproject.premium_cafe_backend.dto.request.MenuItemRequestDto;
import com.internproject.premium_cafe_backend.dto.response.MenuItemResponseDto;
import com.internproject.premium_cafe_backend.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @PostMapping
    public ResponseEntity<MenuItemResponseDto> createMenuItem(
            @Valid @RequestBody MenuItemRequestDto request) {

        return new ResponseEntity<>(
                menuItemService.createMenuItem(request),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MenuItemResponseDto>> getAllMenuItems() {

        return ResponseEntity.ok(menuItemService.getAllMenuItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemResponseDto> getMenuItemById(
            @PathVariable Long id) {

        return ResponseEntity.ok(menuItemService.getMenuItemById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItemResponseDto> updateMenuItem(
            @PathVariable Long id,
            @Valid @RequestBody MenuItemRequestDto request) {

        return ResponseEntity.ok(
                menuItemService.updateMenuItem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(
            @PathVariable Long id) {

        menuItemService.deleteMenuItem(id);

        return ResponseEntity.noContent().build();
    }
}
