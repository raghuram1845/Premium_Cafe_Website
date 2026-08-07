package com.internproject.premium_cafe_backend.mapper;

import com.internproject.premium_cafe_backend.dto.request.ContactRequestDto;
import com.internproject.premium_cafe_backend.dto.response.ContactResponseDto;
import com.internproject.premium_cafe_backend.entity.Contact;
import com.internproject.premium_cafe_backend.enums.ContactStatus;

import java.time.LocalDateTime;

public class ContactMapper {

    public static Contact toEntity(ContactRequestDto dto) {

        LocalDateTime now = LocalDateTime.now();

        return Contact.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .status(ContactStatus.NEW)
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public static ContactResponseDto toResponse(Contact contact) {

        return ContactResponseDto.builder()
                .id(contact.getId())
                .name(contact.getName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .subject(contact.getSubject())
                .message(contact.getMessage())
                .status(contact.getStatus())
                .createdAt(contact.getCreatedAt())
                .updatedAt(contact.getUpdatedAt())
                .build();
    }
}