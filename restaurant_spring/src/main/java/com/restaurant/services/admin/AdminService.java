package com.restaurant.services.admin;

import com.restaurant.dtos.CategoryDto;
import com.restaurant.dtos.ProductDto;

import java.io.IOException;
import java.util.List;


public interface AdminService {
    CategoryDto postCategory(CategoryDto categoryDto) throws IOException;

    List<CategoryDto> getAllCategories();

    List<CategoryDto> getAllCategoriesByTitle(String title);

    ProductDto postProduct(Long categoryId, ProductDto productDto) throws IOException;

    List<ProductDto> getAllProductsByCategory(Long categoryId);
}
