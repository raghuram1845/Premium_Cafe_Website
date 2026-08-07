package com.internproject.premium_cafe_backend.mapper;

import com.internproject.premium_cafe_backend.dto.request.UserRequestDto;
import com.internproject.premium_cafe_backend.dto.response.UserResponseDto;
import com.internproject.premium_cafe_backend.entity.User;

import java.time.LocalDateTime;

public class UserMapper {

    public static User toEntity(UserRequestDto dto) {

        LocalDateTime now = LocalDateTime.now();

        return User.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .password(dto.getPassword())
                .role(dto.getRole())
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public static UserResponseDto toResponse(User user) {

        return UserResponseDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}