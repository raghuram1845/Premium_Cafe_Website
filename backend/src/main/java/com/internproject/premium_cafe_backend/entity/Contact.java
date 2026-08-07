package com.internproject.premium_cafe_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "contacts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String subject;

    @Column(length = 1000)
    private String message;

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}