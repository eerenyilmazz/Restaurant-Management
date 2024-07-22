package com.restaurant.services.customer;

import com.restaurant.dtos.CategoryDto;

import java.util.List;

public interface CustomerService {
    List<CategoryDto> getAllCategories();
}
