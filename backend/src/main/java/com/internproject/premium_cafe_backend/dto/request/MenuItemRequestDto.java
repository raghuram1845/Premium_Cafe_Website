package com.internproject.premium_cafe_backend.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemRequestDto {

    private String name;

    private String description;

    private BigDecimal price;

    private String imageUrl;

    private Boolean availability;

    private Long categoryId;
}
