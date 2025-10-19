package com.laraid.ganeshfest.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String code;
    private String name;
    private Double price;
    private String category;
    private List<ImageDto> images;  // ✅ not plain String list

    @Data
    public static class ImageDto {
        private String url;
        private String category;
        private String subCategory;
    }
}
