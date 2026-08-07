package com.internproject.premium_cafe_backend.service.serviceimpl;

import com.internproject.premium_cafe_backend.dto.request.ContactRequestDto;
import com.internproject.premium_cafe_backend.dto.response.ContactResponseDto;
import com.internproject.premium_cafe_backend.entity.Contact;
import com.internproject.premium_cafe_backend.exception.InvalidRequestException;
import com.internproject.premium_cafe_backend.exception.ResourceNotFoundException;
import com.internproject.premium_cafe_backend.mapper.ContactMapper;
import com.internproject.premium_cafe_backend.repository.ContactRepository;
import com.internproject.premium_cafe_backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Override
    public ContactResponseDto createContact(ContactRequestDto request) {

        if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new InvalidRequestException("Invalid email address.");
        }

        if (!request.getPhone().matches("\\d{10}")) {
            throw new InvalidRequestException(
                    "Phone number must contain exactly 10 digits.");
        }

        if (request.getSubject() == null ||
                request.getSubject().trim().isEmpty()) {

            throw new InvalidRequestException(
                    "Subject cannot be empty.");
        }

        if (request.getMessage() == null ||
                request.getMessage().trim().isEmpty()) {

            throw new InvalidRequestException(
                    "Message cannot be empty.");
        }

        Contact contact = ContactMapper.toEntity(request);

        Contact savedContact = contactRepository.save(contact);

        return ContactMapper.toResponse(savedContact);
    }

    @Override
    public List<ContactResponseDto> getAllContacts() {

        return contactRepository.findAll()
                .stream()
                .map(ContactMapper::toResponse)
                .toList();
    }

    @Override
    public ContactResponseDto getContactById(Long id) {

        Contact contact = contactRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contact not found with id : " + id));

        return ContactMapper.toResponse(contact);
    }

    @Override
    public ContactResponseDto updateContact(Long id,
                                            ContactRequestDto request) {

        Contact contact = contactRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contact not found with id : " + id));

        if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new InvalidRequestException("Invalid email address.");
        }

        if (!request.getPhone().matches("\\d{10}")) {
            throw new InvalidRequestException(
                    "Phone number must contain exactly 10 digits.");
        }

        if (request.getSubject() == null ||
                request.getSubject().trim().isEmpty()) {

            throw new InvalidRequestException(
                    "Subject cannot be empty.");
        }

        if (request.getMessage() == null ||
                request.getMessage().trim().isEmpty()) {

            throw new InvalidRequestException(
                    "Message cannot be empty.");
        }

        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setSubject(request.getSubject());
        contact.setMessage(request.getMessage());
        contact.setUpdatedAt(LocalDateTime.now());

        Contact updatedContact = contactRepository.save(contact);

        return ContactMapper.toResponse(updatedContact);
    }

    @Override
    public void deleteContact(Long id) {

        Contact contact = contactRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contact not found with id : " + id));

        contactRepository.delete(contact);
    }
}