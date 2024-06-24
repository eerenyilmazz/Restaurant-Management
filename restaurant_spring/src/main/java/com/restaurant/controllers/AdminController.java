package com.restaurant.controllers;

import com.restaurant.dtos.CategoryDto;
import com.restaurant.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/*
@RequiredArgsConstructor sadece final ve
@NonNull alanlar için bir yapıcı (constructor)
oluşturur. Eğer sınıfta final olmayan alanlar varsa,
bu alanlar için yapılandırıcı oluşturulmaz.
Öte yandan, @AllArgsConstructor ise sınıftaki tüm alanlar
(hem final hem de final olmayanlar) için bir yapılandırıcı oluşturur. */

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/category")
    public ResponseEntity<CategoryDto> postCategory(@ModelAttribute CategoryDto categoryDto) throws IOException {
        CategoryDto createdCategoryDto = adminService.postCategory(categoryDto);
        if (createdCategoryDto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(createdCategoryDto);
    }
}
