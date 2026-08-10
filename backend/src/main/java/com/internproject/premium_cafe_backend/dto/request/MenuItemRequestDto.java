package com.internproject.premium_cafe_backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemRequestDto {

    @NotBlank(message = "Menu item name cannot be empty.")
    @Size(max = 100, message = "Menu item name cannot exceed 100 characters.")
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters.")
    private String description;

    @NotNull(message = "Price is required.")
    @DecimalMin(
            value = "0.01",
            message = "Price must be greater than zero."
    )
    private BigDecimal price;

    @NotBlank(message = "Image URL cannot be empty.")
    private String imageUrl;

    @NotNull(message = "Availability is required.")
    private Boolean availability;

    @NotNull(message = "Category ID is required.")
    @Positive(message = "Category ID must be greater than zero.")
    private Long categoryId;
}