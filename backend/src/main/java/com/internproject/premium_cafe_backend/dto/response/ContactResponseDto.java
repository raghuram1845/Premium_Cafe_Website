package com.internproject.premium_cafe_backend.dto.response;

import com.internproject.premium_cafe_backend.enums.ContactStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactResponseDto {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String subject;

    private String message;

    private ContactStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}