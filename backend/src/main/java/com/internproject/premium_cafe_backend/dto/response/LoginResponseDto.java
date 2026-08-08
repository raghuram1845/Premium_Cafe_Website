package com.internproject.premium_cafe_backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDto {

    private Long userId;

    private String fullName;

    private String email;

    private String role;

    private String token;

    private String message;
}