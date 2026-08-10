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
public class ContactRequestDto {

    @NotBlank(message = "Name cannot be empty.")
    @Size(max = 100, message = "Name cannot exceed 100 characters.")
    private String name;

    @NotBlank(message = "Email cannot be empty.")
    @Email(message = "Invalid email address.")
    private String email;

    @NotBlank(message = "Phone cannot be empty.")
    @Pattern(
            regexp = "\\d{10}",
            message = "Phone number must contain exactly 10 digits."
    )
    private String phone;

    @NotBlank(message = "Subject cannot be empty.")
    @Size(max = 200, message = "Subject cannot exceed 200 characters.")
    private String subject;

    @NotBlank(message = "Message cannot be empty.")
    @Size(max = 1000, message = "Message cannot exceed 1000 characters.")
    private String message;
}