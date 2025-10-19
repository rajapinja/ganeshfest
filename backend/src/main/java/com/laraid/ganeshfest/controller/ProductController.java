package com.laraid.ganeshfest.controller;

import com.laraid.ganeshfest.domain.Category;
import com.laraid.ganeshfest.domain.Product;
import com.laraid.ganeshfest.dto.ProductDto;
import com.laraid.ganeshfest.dto.ProductUpdateDto;
import com.laraid.ganeshfest.mapper.ProductMapper;
import com.laraid.ganeshfest.service.ProductService;
import com.laraid.ganeshfest.util.UploadDir;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Flow;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final UploadDir uploadBaseDir;
    private final ProductMapper productMapper;

    @GetMapping("/products/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // ProductController.java
    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getProducts(
            @RequestParam String category,
            @RequestParam(required = false) String subCategory) {
        return ResponseEntity.ok(productService.findByCategoryOrSubCategory(category, subCategory));
    }

    @GetMapping("/category/{category}")
    public List<ProductDto> getByCategory(@PathVariable String category,
                                          @RequestParam(required = false, name = "sub") String subCategory) {
        return productService.getByCategoryAndSubCategory(category, subCategory)
                .stream()
                .map(productMapper::toDto)
                .toList();
    }

    @GetMapping("/category/{category}/{subCategory}")
    public List<ProductDto> getByCategoryAndSubCategory(@PathVariable String category,
                                                        @PathVariable String subCategory) {
        return productService.findByCategoryOrSubCategory(category, subCategory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @DeleteMapping("/{id}/images")
    public ResponseEntity<Product> deleteImage(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {

        String url = payload.get("url");
        Product updated = productService.removeImage(id, url);

        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{code}/images")
    public ResponseEntity<ProductDto> uploadImage(
            @PathVariable String code,
            @RequestParam("file") MultipartFile file,
            @RequestParam String category,
            @RequestParam String subCategory,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double price
    ) throws IOException {

        Product updated = productService.uploadImageByCategoryAndSubCategory(
                category, subCategory, file, name, price
        );
        return ResponseEntity.ok(productMapper.toDto(updated));
    }

    @PostMapping("/{category}/{subCategory}/products")
    public ResponseEntity<ProductDto> createProduct(
            @PathVariable String category,
            @PathVariable String subCategory,
            @RequestParam("file") MultipartFile file,
            @RequestParam String name,
            @RequestParam Double price) throws IOException {

        Product product = productService.createProductWithImage(category, subCategory, name, price, file);
        return ResponseEntity.ok(productMapper.toDto(product));
    }

    @PostMapping("/code/{code}/images")
    public ProductDto uploadByCode(
            @PathVariable String code,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subCategory,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) double price
    ) {
        return productMapper.toDto(productService.uploadImageByCategoryAndSubCategory(category, subCategory, file, name, price));

    }

    // ProductController.java
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductUpdateDto updateDto) {

        Product updated = productService.updateProduct(id, updateDto);
        return ResponseEntity.ok(productMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

}
