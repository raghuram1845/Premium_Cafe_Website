package com.internproject.premium_cafe_backend.controller;

import com.internproject.premium_cafe_backend.dto.request.CafeTableRequestDto;
import com.internproject.premium_cafe_backend.dto.response.CafeTableResponseDto;
import com.internproject.premium_cafe_backend.service.CafeTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class CafeTableController {

    private final CafeTableService cafeTableService;

    @PostMapping
    public ResponseEntity<CafeTableResponseDto> createCafeTable(
            @RequestBody CafeTableRequestDto request) {

        return new ResponseEntity<>(
                cafeTableService.createCafeTable(request),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CafeTableResponseDto>> getAllCafeTables() {

        return ResponseEntity.ok(cafeTableService.getAllCafeTables());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CafeTableResponseDto> getCafeTableById(
            @PathVariable Long id) {

        return ResponseEntity.ok(cafeTableService.getCafeTableById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CafeTableResponseDto> updateCafeTable(
            @PathVariable Long id,
            @RequestBody CafeTableRequestDto request) {

        return ResponseEntity.ok(
                cafeTableService.updateCafeTable(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCafeTable(
            @PathVariable Long id) {

        cafeTableService.deleteCafeTable(id);

        return ResponseEntity.noContent().build();
    }
}
