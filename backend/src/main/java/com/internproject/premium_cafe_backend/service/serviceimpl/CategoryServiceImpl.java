package com.internproject.premium_cafe_backend.service.serviceimpl;

import com.internproject.premium_cafe_backend.dto.request.CategoryRequestDto;
import com.internproject.premium_cafe_backend.dto.response.CategoryResponseDto;
import com.internproject.premium_cafe_backend.entity.Category;
import com.internproject.premium_cafe_backend.exception.ResourceNotFoundException;
import com.internproject.premium_cafe_backend.mapper.CategoryMapper;
import com.internproject.premium_cafe_backend.repository.CategoryRepository;
import com.internproject.premium_cafe_backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponseDto createCategory(CategoryRequestDto request) {

        if (categoryRepository.findByName(request.getName()).isPresent()) {
            throw new RuntimeException("Category already exists.");
        }
        Category category = CategoryMapper.toEntity(request);

        Category savedCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(savedCategory);
    }

    @Override
    public List<CategoryResponseDto> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }

    @Override
    public CategoryResponseDto getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found with id : " + id));

        return CategoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found with id : " + id));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setUpdatedAt(LocalDateTime.now());

        Category updatedCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found with id : " + id));

        categoryRepository.delete(category);
    }
}