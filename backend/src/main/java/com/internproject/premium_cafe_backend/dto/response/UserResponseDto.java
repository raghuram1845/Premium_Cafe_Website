package com.internproject.premium_cafe_backend.dto.response;

import com.internproject.premium_cafe_backend.enums.Role;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private Long id;

    private String fullName;

    private String email;

    private String phone;

    private Role role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}