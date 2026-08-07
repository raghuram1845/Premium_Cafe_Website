package com.internproject.premium_cafe_backend.service.serviceimpl;

import com.internproject.premium_cafe_backend.dto.request.EventRequestDto;
import com.internproject.premium_cafe_backend.dto.response.EventResponseDto;
import com.internproject.premium_cafe_backend.entity.Event;
import com.internproject.premium_cafe_backend.exception.DuplicateResourceException;
import com.internproject.premium_cafe_backend.exception.InvalidRequestException;
import com.internproject.premium_cafe_backend.exception.ResourceNotFoundException;
import com.internproject.premium_cafe_backend.mapper.EventMapper;
import com.internproject.premium_cafe_backend.repository.EventRepository;
import com.internproject.premium_cafe_backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Override
    public EventResponseDto createEvent(EventRequestDto request) {

        if (eventRepository.findByTitle(request.getTitle()).isPresent()) {
            throw new DuplicateResourceException("Event title already exists.");
        }

        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new InvalidRequestException("Start date cannot be in the past.");
        }

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new InvalidRequestException("End date cannot be before start date.");
        }

        if (request.getDiscount().compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidRequestException("Discount cannot be negative.");
        }

        if (request.getDiscount().compareTo(new BigDecimal("100")) > 0) {
            throw new InvalidRequestException("Discount cannot exceed 100%.");
        }

        Event event = EventMapper.toEntity(request);

        Event savedEvent = eventRepository.save(event);

        return EventMapper.toResponse(savedEvent);
    }

    @Override
    public List<EventResponseDto> getAllEvents() {

        return eventRepository.findAll()
                .stream()
                .map(EventMapper::toResponse)
                .toList();
    }

    @Override
    public EventResponseDto getEventById(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found with id : " + id));

        return EventMapper.toResponse(event);
    }

    @Override
    public EventResponseDto updateEvent(Long id, EventRequestDto request) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found with id : " + id));

        Optional<Event> existingEvent =
                eventRepository.findByTitle(request.getTitle());

        if (existingEvent.isPresent()
                && !existingEvent.get().getId().equals(id)) {

            throw new DuplicateResourceException("Event title already exists.");
        }

        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new InvalidRequestException("Start date cannot be in the past.");
        }

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new InvalidRequestException("End date cannot be before start date.");
        }

        if (request.getDiscount().compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidRequestException("Discount cannot be negative.");
        }

        if (request.getDiscount().compareTo(new BigDecimal("100")) > 0) {
            throw new InvalidRequestException("Discount cannot exceed 100%.");
        }

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setImageUrl(request.getImageUrl());
        event.setStartDate(request.getStartDate());
        event.setEndDate(request.getEndDate());
        event.setDiscount(request.getDiscount());
        event.setActive(request.getActive());
        event.setUpdatedAt(LocalDateTime.now());

        Event updatedEvent = eventRepository.save(event);

        return EventMapper.toResponse(updatedEvent);
    }

    @Override
    public void deleteEvent(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found with id : " + id));

        eventRepository.delete(event);
    }
}