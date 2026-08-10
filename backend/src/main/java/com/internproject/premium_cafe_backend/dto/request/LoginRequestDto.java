package com.internproject.premium_cafe_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequestDto {

    @NotBlank(message = "Email cannot be empty.")
    @Email(message = "Invalid email address.")
    private String email;

    @NotBlank(message = "Password cannot be empty.")
    private String password;
}