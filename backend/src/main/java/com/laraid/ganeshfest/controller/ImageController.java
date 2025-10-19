package com.laraid.ganeshfest.controller;

import com.laraid.ganeshfest.dto.ProductDto;
import com.laraid.ganeshfest.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

//Use ImageController when you just want a gallery of images under a category/subcategory, independent of products (like festival albums, banner galleries).

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    private static final Logger log = LoggerFactory.getLogger(ImageController.class);

    private final ProductService productService;

    public ImageController(ProductService productService) {
        this.productService = productService;
    }

    // Fetch all images for a category+subcategory
    @GetMapping("/{category}/{subCategory}")
    public List<ProductDto> getImages(@PathVariable String category,
                                      @PathVariable String subCategory) {

        log.info("Category: {} and SubCategory: {}",category,subCategory);
        return productService.getImages(category, subCategory);
    }

    @PostMapping("/{category}/{subCategory}")
    public ResponseEntity<ProductDto> uploadImage(
            @PathVariable String category,
            @PathVariable String subCategory,
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("price") double price) {

        ProductDto productDto =  productService.upload(category, subCategory, file, name, price);
        return ResponseEntity.ok(productDto);
    }

}

