package com.internproject.premium_cafe_backend.dto.response;

import com.internproject.premium_cafe_backend.enums.TableStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CafeTableResponseDto {

    private Long id;

    private Integer tableNumber;

    private Integer capacity;

    private TableStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}