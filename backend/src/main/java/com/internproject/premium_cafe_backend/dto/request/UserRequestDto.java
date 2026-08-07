package com.internproject.premium_cafe_backend.dto.request;

import com.internproject.premium_cafe_backend.enums.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDto {

    private String fullName;

    private String email;

    private String phone;

    private String password;

    private Role role;
}