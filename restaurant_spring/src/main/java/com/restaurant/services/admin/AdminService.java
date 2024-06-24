package com.restaurant.services.admin;

import com.restaurant.dtos.CategoryDto;

import java.io.IOException;
import java.util.List;


public interface AdminService {
    CategoryDto postCategory(CategoryDto categoryDto) throws IOException;

    List<CategoryDto> getAllCategories();
}
