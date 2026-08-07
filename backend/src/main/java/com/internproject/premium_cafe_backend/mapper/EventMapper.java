package com.internproject.premium_cafe_backend.mapper;

import com.internproject.premium_cafe_backend.dto.request.EventRequestDto;
import com.internproject.premium_cafe_backend.dto.response.EventResponseDto;
import com.internproject.premium_cafe_backend.entity.Event;

import java.time.LocalDateTime;

public class EventMapper {

    public static Event toEntity(EventRequestDto dto) {

        LocalDateTime now = LocalDateTime.now();

        return Event.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .discount(dto.getDiscount())
                .active(dto.getActive())
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public static EventResponseDto toResponse(Event event) {

        return EventResponseDto.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .imageUrl(event.getImageUrl())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .discount(event.getDiscount())
                .active(event.getActive())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }
}