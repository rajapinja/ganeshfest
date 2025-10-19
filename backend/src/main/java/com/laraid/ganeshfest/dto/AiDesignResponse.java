package com.laraid.ganeshfest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class AiDesignResponse {
    private List<String> images;
}