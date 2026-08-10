package com.internproject.premium_cafe_backend.dto.request;

import com.internproject.premium_cafe_backend.enums.ContactStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactStatusUpdateDto {

    @NotNull(message = "Status is required.")
    private ContactStatus status;
}