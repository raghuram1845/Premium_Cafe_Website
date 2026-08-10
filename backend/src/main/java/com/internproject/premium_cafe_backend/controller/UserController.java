package com.internproject.premium_cafe_backend.controller;

import com.internproject.premium_cafe_backend.dto.request.LoginRequestDto;
import com.internproject.premium_cafe_backend.dto.request.UserRequestDto;
import com.internproject.premium_cafe_backend.dto.response.LoginResponseDto;
import com.internproject.premium_cafe_backend.dto.response.UserResponseDto;
import com.internproject.premium_cafe_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.internproject.premium_cafe_backend.dto.request.ProfileUpdateRequestDto;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(
            @Valid @RequestBody UserRequestDto request) {

        UserResponseDto response = userService.createUser(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {

        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {

        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDto request) {

        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<UserResponseDto> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody ProfileUpdateRequestDto request) {

        return ResponseEntity.ok(
                userService.updateProfile(id, request)
        );
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserResponseDto> getProfile(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.getProfile(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @Valid @RequestBody LoginRequestDto request) {

        return ResponseEntity.ok(
                userService.login(request)
        );
    }

}