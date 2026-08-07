package com.internproject.premium_cafe_backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactRequestDto {

    private String name;

    private String email;

    private String phone;

    private String subject;

    private String message;
}
