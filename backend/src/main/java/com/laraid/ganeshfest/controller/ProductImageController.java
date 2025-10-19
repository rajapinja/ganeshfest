package com.laraid.ganeshfest.controller;

import com.laraid.ganeshfest.domain.Product;
import com.laraid.ganeshfest.dto.ProductDto;
import com.laraid.ganeshfest.mapper.ProductMapper;
import com.laraid.ganeshfest.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

//Use ProductImageController when images must be tied to a real product (like product cards, e-commerce).

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductImageController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    // Upload by Product ID
    @PostMapping("/id/{id}/images")
    public ProductDto uploadById(@PathVariable Long id,
                                 @RequestParam String category,
                                 @RequestParam String subCategory,
                                 @RequestParam("file") MultipartFile file) {
        Product updated = productService.uploadImage(id,category,subCategory, file);
        return productMapper.toDto(updated);
    }

    // Fetch by Product ID
    @GetMapping("/id/{id}/images")
    public ProductDto getImagesById(@PathVariable Long id) {
        Product product = productService.getById(id);
        return productMapper.toDto(product);
    }
}


