package com.internproject.premium_cafe_backend.dto.request;

import com.internproject.premium_cafe_backend.enums.TableStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CafeTableRequestDto {

    @NotNull(message = "Table number is required.")
    @Positive(message = "Table number must be greater than zero.")
    private Integer tableNumber;

    @NotNull(message = "Capacity is required.")
    @Positive(message = "Capacity must be greater than zero.")
    private Integer capacity;

    @NotNull(message = "Table status is required.")
    private TableStatus status;
}