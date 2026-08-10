package com.internproject.premium_cafe_backend.service;

import com.internproject.premium_cafe_backend.dto.request.ProfileUpdateRequestDto;
import com.internproject.premium_cafe_backend.dto.request.UserRequestDto;
import com.internproject.premium_cafe_backend.dto.response.UserResponseDto;
import com.internproject.premium_cafe_backend.dto.request.LoginRequestDto;
import com.internproject.premium_cafe_backend.dto.response.LoginResponseDto;

import java.util.List;

public interface UserService {

    UserResponseDto createUser(UserRequestDto request);

    List<UserResponseDto> getAllUsers();

    UserResponseDto getUserById(Long id);

    UserResponseDto updateUser(Long id, UserRequestDto request);

    void deleteUser(Long id);

    LoginResponseDto login(LoginRequestDto request);

    UserResponseDto updateProfile(
            Long id,
            ProfileUpdateRequestDto request
    );
    UserResponseDto getProfile(Long id);
}