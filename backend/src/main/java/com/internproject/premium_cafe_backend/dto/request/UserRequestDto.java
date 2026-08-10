package com.internproject.premium_cafe_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDto {

    @NotBlank(message = "Full name cannot be empty.")
    @Size(max = 100, message = "Full name cannot exceed 100 characters.")
    private String fullName;

    @NotBlank(message = "Email cannot be empty.")
    @Email(message = "Invalid email address.")
    private String email;

    @NotBlank(message = "Phone cannot be empty.")
    @Pattern(
            regexp = "\\d{10}",
            message = "Phone number must contain exactly 10 digits."
    )
    private String phone;

    @NotBlank(message = "Password cannot be empty.")
    @Size(
            min = 8,
            max = 100,
            message = "Password must contain between 8 and 100 characters."
    )
    private String password;
}