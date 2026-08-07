package com.internproject.premium_cafe_backend.service;

import com.internproject.premium_cafe_backend.dto.request.CafeTableRequestDto;
import com.internproject.premium_cafe_backend.dto.response.CafeTableResponseDto;

import java.util.List;

public interface CafeTableService {

    CafeTableResponseDto createCafeTable(CafeTableRequestDto request);

    List<CafeTableResponseDto> getAllCafeTables();

    CafeTableResponseDto getCafeTableById(Long id);

    CafeTableResponseDto updateCafeTable(Long id,
                                         CafeTableRequestDto request);

    void deleteCafeTable(Long id);
}