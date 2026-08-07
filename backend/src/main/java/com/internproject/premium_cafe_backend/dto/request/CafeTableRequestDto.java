package com.internproject.premium_cafe_backend.dto.request;

import com.internproject.premium_cafe_backend.enums.TableStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CafeTableRequestDto {

    private Integer tableNumber;

    private Integer capacity;

    private TableStatus status;
}
