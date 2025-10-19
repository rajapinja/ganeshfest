package com.laraid.ganeshfest.mapper;

import com.laraid.ganeshfest.domain.Category;
import com.laraid.ganeshfest.domain.Product;
import com.laraid.ganeshfest.domain.ProductImage;
import com.laraid.ganeshfest.dto.ProductDto;
import com.laraid.ganeshfest.service.FileStorageService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    private final FileStorageService storageService;

    public ProductMapper(FileStorageService storageService) {
        this.storageService = storageService;
    }

    public ProductDto toDto(Product product) {
        if (product == null) return null;

        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setCode(product.getCode());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());

        if (product.getCategory() != null) {
            dto.setCategory(product.getCategory().name());
        }

        if (product.getImages() != null) {
            List<ProductDto.ImageDto> imageDtos = product.getImages().stream()
                    .map(img -> {
                        ProductDto.ImageDto i = new ProductDto.ImageDto();
                        i.setUrl(storageService.resolveUrl(img.getUrl())); // ✅ proper URL
                        i.setCategory(img.getCategory());
                        i.setSubCategory(img.getSubCategory());
                        return i;
                    })
                    .collect(Collectors.toList());
            dto.setImages(imageDtos);
        }

        return dto;
    }

    public Product toEntity(ProductDto dto) {
        if (dto == null) return null;

        Product product = new Product();
        product.setId(dto.getId());
        product.setCode(dto.getCode());
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());

        if (dto.getCategory() != null) {
            try {
                product.setCategory(Category.valueOf(dto.getCategory().toUpperCase()));
            } catch (IllegalArgumentException ex) {
                throw new RuntimeException("Invalid category: " + dto.getCategory());
            }
        }

        if (dto.getImages() != null) {
            List<ProductImage> imgs = dto.getImages().stream()
                    .map(i -> {
                        ProductImage img = new ProductImage();

                        String url = i.getUrl();
                        if (url != null && url.contains("/uploads/")) {
                            // strip prefix so only relative path is stored
                            url = url.substring(url.indexOf("/uploads/") + "/uploads/".length());
                        }

                        img.setUrl(url);
                        img.setCategory(i.getCategory());
                        img.setSubCategory(i.getSubCategory());
                        return img;
                    })
                    .collect(Collectors.toList());
            product.setImages(imgs);
        }

        return product;
    }

    public List<ProductDto> toDtoList(List<Product> products) {
        if (products == null) return List.of();
        return products.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Product> toEntityList(List<ProductDto> dtos) {
        if (dtos == null) return List.of();
        return dtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}
