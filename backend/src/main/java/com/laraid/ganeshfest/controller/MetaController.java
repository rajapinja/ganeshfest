package com.laraid.ganeshfest.controller;

import com.laraid.ganeshfest.domain.Category;
import com.laraid.ganeshfest.domain.SubCategory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/meta")
public class MetaController {

    @GetMapping("/categories")
    public Map<String, List<String>> getCategories() {
        return Arrays.stream(Category.values())
                .collect(Collectors.toMap(
                        Category::name,
                        category -> Arrays.stream(SubCategory.values())
                                .filter(sc -> sc.getParent() == category)
                                .map(Enum::name)
                                .toList()
                ));
    }
}

