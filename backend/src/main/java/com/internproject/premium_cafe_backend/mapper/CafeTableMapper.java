package com.internproject.premium_cafe_backend.mapper;

import com.internproject.premium_cafe_backend.dto.request.CafeTableRequestDto;
import com.internproject.premium_cafe_backend.dto.response.CafeTableResponseDto;
import com.internproject.premium_cafe_backend.entity.CafeTable;

import java.time.LocalDateTime;

public class CafeTableMapper {

    public static CafeTable toEntity(CafeTableRequestDto dto) {

        LocalDateTime now = LocalDateTime.now();

        return CafeTable.builder()
                .tableNumber(dto.getTableNumber())
                .capacity(dto.getCapacity())
                .status(dto.getStatus())
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public static CafeTableResponseDto toResponse(CafeTable table) {

        return CafeTableResponseDto.builder()
                .id(table.getId())
                .tableNumber(table.getTableNumber())
                .capacity(table.getCapacity())
                .status(table.getStatus())
                .createdAt(table.getCreatedAt())
                .updatedAt(table.getUpdatedAt())
                .build();
    }
}
