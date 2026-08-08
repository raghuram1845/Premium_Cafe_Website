package com.internproject.premium_cafe_backend.service.serviceimpl;

import com.internproject.premium_cafe_backend.dto.request.LoginRequestDto;
import com.internproject.premium_cafe_backend.dto.request.UserRequestDto;
import com.internproject.premium_cafe_backend.dto.response.LoginResponseDto;
import com.internproject.premium_cafe_backend.dto.response.UserResponseDto;
import com.internproject.premium_cafe_backend.entity.User;
import com.internproject.premium_cafe_backend.exception.InvalidRequestException;
import com.internproject.premium_cafe_backend.exception.ResourceNotFoundException;
import com.internproject.premium_cafe_backend.mapper.UserMapper;
import com.internproject.premium_cafe_backend.repository.UserRepository;
import com.internproject.premium_cafe_backend.security.JwtService;
import com.internproject.premium_cafe_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public UserResponseDto createUser(UserRequestDto request) {

        User user = UserMapper.toEntity(request);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    @Override
    public UserResponseDto getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id : " + id));

        return UserMapper.toResponse(user);
    }

    @Override
    public UserResponseDto updateUser(Long id, UserRequestDto request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id : " + id));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);

        return UserMapper.toResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id : " + id));

        userRepository.delete(user);
    }

    @Override
    public LoginResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email : " + request.getEmail()));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new InvalidRequestException("Invalid Login Details.");
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

        return LoginResponseDto.builder()
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .token(token)
                .message("Login successful.")
                .build();
    }
}