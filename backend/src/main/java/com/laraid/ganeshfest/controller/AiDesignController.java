package com.laraid.ganeshfest.controller;

import com.laraid.ganeshfest.dto.AiDesignRequest;
import com.laraid.ganeshfest.dto.AiDesignResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/ai/design")
public class AiDesignController {

    @PostMapping
    public AiDesignResponse generateDesign(@RequestBody AiDesignRequest request) {
        // TODO: integrate with Stable Diffusion / OpenAI / custom model
        // For now return sample images (placeholders)
        return new AiDesignResponse(Arrays.asList(
                "https://placehold.co/300x400?text=Ganesh+Design+1",
                "https://placehold.co/300x400?text=Ganesh+Design+2",
                "https://placehold.co/300x400?text=Ganesh+Design+3"
        ));
    }
}

