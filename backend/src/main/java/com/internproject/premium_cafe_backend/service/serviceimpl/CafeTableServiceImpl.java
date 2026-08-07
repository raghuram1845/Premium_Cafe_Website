package com.internproject.premium_cafe_backend.service.serviceimpl;

import com.internproject.premium_cafe_backend.dto.request.CafeTableRequestDto;
import com.internproject.premium_cafe_backend.dto.response.CafeTableResponseDto;
import com.internproject.premium_cafe_backend.entity.CafeTable;
import com.internproject.premium_cafe_backend.exception.DuplicateResourceException;
import com.internproject.premium_cafe_backend.exception.InvalidRequestException;
import com.internproject.premium_cafe_backend.exception.ResourceNotFoundException;
import com.internproject.premium_cafe_backend.mapper.CafeTableMapper;
import com.internproject.premium_cafe_backend.repository.CafeTableRepository;
import com.internproject.premium_cafe_backend.service.CafeTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CafeTableServiceImpl implements CafeTableService {

    private final CafeTableRepository cafeTableRepository;

    @Override
    public CafeTableResponseDto createCafeTable(CafeTableRequestDto request) {

        if (cafeTableRepository.findByTableNumber(request.getTableNumber()).isPresent()) {
            throw new DuplicateResourceException("Table number already exists.");
        }

        if (request.getCapacity() <= 0) {
            throw new InvalidRequestException("Capacity must be greater than zero.");
        }

        CafeTable cafeTable = CafeTableMapper.toEntity(request);

        CafeTable savedCafeTable = cafeTableRepository.save(cafeTable);

        return CafeTableMapper.toResponse(savedCafeTable);
    }

    @Override
    public List<CafeTableResponseDto> getAllCafeTables() {

        return cafeTableRepository.findAll()
                .stream()
                .map(CafeTableMapper::toResponse)
                .toList();
    }

    @Override
    public CafeTableResponseDto getCafeTableById(Long id) {

        CafeTable cafeTable = cafeTableRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Table not found with id : " + id));

        return CafeTableMapper.toResponse(cafeTable);
    }

    @Override
    public CafeTableResponseDto updateCafeTable(Long id,
                                                CafeTableRequestDto request) {

        CafeTable cafeTable = cafeTableRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Table not found with id : " + id));

        if (request.getCapacity() <= 0) {
            throw new InvalidRequestException("Capacity must be greater than zero.");
        }

        Optional<CafeTable> existingTable =
                cafeTableRepository.findByTableNumber(request.getTableNumber());

        if (existingTable.isPresent() &&
                !existingTable.get().getId().equals(id)) {

            throw new DuplicateResourceException("Table number already exists.");
        }

        cafeTable.setTableNumber(request.getTableNumber());
        cafeTable.setCapacity(request.getCapacity());
        cafeTable.setStatus(request.getStatus());
        cafeTable.setUpdatedAt(LocalDateTime.now());

        CafeTable updatedCafeTable = cafeTableRepository.save(cafeTable);

        return CafeTableMapper.toResponse(updatedCafeTable);
    }

    @Override
    public void deleteCafeTable(Long id) {

        CafeTable cafeTable = cafeTableRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Table not found with id : " + id));

        cafeTableRepository.delete(cafeTable);
    }
}
