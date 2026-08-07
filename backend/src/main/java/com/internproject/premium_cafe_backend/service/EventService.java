package com.internproject.premium_cafe_backend.service;

import com.internproject.premium_cafe_backend.dto.request.EventRequestDto;
import com.internproject.premium_cafe_backend.dto.response.EventResponseDto;

import java.util.List;

public interface EventService {

    EventResponseDto createEvent(EventRequestDto request);

    List<EventResponseDto> getAllEvents();

    EventResponseDto getEventById(Long id);

    EventResponseDto updateEvent(Long id, EventRequestDto request);

    void deleteEvent(Long id);
}