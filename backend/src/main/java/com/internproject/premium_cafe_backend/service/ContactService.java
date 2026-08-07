package com.internproject.premium_cafe_backend.service;

import com.internproject.premium_cafe_backend.dto.request.ContactRequestDto;
import com.internproject.premium_cafe_backend.dto.response.ContactResponseDto;

import java.util.List;

public interface ContactService {

    ContactResponseDto createContact(ContactRequestDto request);

    List<ContactResponseDto> getAllContacts();

    ContactResponseDto getContactById(Long id);

    ContactResponseDto updateContact(Long id,
                                     ContactRequestDto request);

    void deleteContact(Long id);
}