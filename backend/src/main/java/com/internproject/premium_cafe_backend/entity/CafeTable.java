package com.internproject.premium_cafe_backend.entity;

import com.internproject.premium_cafe_backend.enums.TableStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cafe_tables")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CafeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Integer tableNumber;

    @Column(nullable = false)
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TableStatus status;

    @OneToMany(mappedBy = "cafeTable")
    private List<Reservation> reservations;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}