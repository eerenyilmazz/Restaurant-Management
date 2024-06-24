package com.restaurant.controllers;

import com.restaurant.dtos.CategoryDto;
import com.restaurant.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/*
@RequiredArgsConstructor sadece final ve
@NonNull alanlar için bir yapıcı (constructor)
oluşturur. Eğer sınıfta final olmayan alanlar varsa,
bu alanlar için yapılandırıcı oluşturulmaz.
Öte yandan, @AllArgsConstructor ise sınıftaki tüm alanlar
(hem final hem de final olmayanlar) için bir yapılandırıcı oluşturur.
 final olarak tanımladığınız AdminService örneği, yalnızca bir kere başlatılacak ve değiştirilemeyecek.
 Bu da AdminService'in stabil çalışmasını sağlar, çünkü herhangi bir yerde yeniden atanamaz veya değiştirilemez.
 Bu, bağımlılık enjeksiyonunun (dependency injection) bir avantajıdır ve final keyword'üyle
 birlikte kullanılması bu durumu daha da pekiştirir.*/

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

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories(){
        List<CategoryDto> categoryDtoList = adminService.getAllCategories();
        if (categoryDtoList == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(categoryDtoList);
    }
}
