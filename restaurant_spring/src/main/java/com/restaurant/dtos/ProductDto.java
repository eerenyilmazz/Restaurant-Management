package com.restaurant.dtos;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductDto {

    private Long id;
    private String name;
    private double price;
    private String description;
    private byte[] returnedImg;
    private MultipartFile img;
    private long categoryId;
    private String categoryName;
}
