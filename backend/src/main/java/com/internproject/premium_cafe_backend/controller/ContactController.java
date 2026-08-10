package com.internproject.premium_cafe_backend.controller;

import com.internproject.premium_cafe_backend.dto.request.ContactRequestDto;
import com.internproject.premium_cafe_backend.dto.response.ContactResponseDto;
import com.internproject.premium_cafe_backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.internproject.premium_cafe_backend.dto.request.ContactStatusUpdateDto;
import com.internproject.premium_cafe_backend.enums.ContactStatus;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponseDto> createContact(
            @Valid @RequestBody ContactRequestDto request) {

        return new ResponseEntity<>(
                contactService.createContact(request),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ContactResponseDto>> getAllContacts() {

        return ResponseEntity.ok(
                contactService.getAllContacts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponseDto> getContactById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                contactService.getContactById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactResponseDto> updateContact(
            @PathVariable Long id,
            @Valid @RequestBody ContactRequestDto request) {

        return ResponseEntity.ok(
                contactService.updateContact(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ContactResponseDto> updateContactStatus(
            @PathVariable Long id,
            @Valid @RequestBody ContactStatusUpdateDto request) {

        return ResponseEntity.ok(
                contactService.updateContactStatus(
                        id,
                        request.getStatus()
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @PathVariable Long id) {

        contactService.deleteContact(id);

        return ResponseEntity.noContent().build();
    }
}