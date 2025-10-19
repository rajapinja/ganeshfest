package com.laraid.ganeshfest.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path rootLocation;

    public FileStorageService(@Value("${app.upload-dir}") String uploadDir) {
        this.rootLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("❌ Could not initialize storage", e);
        }
    }

    public String save(MultipartFile file, String category, String subCategory) {
        try {
            if (file.isEmpty()) throw new RuntimeException("❌ Empty file");

            String safeCategory = category.toLowerCase();
            String safeSubCategory = subCategory.toLowerCase();

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path dir = rootLocation.resolve(safeCategory).resolve(safeSubCategory);
            Files.createDirectories(dir);

            Path dest = dir.resolve(filename);
            file.transferTo(dest);

            // return relative path for URL resolution
            String relativePath = "/uploads/" + safeCategory.toLowerCase() + "/" + safeSubCategory.toLowerCase() + "/" + filename;
            //return safeCategory + "/" + safeSubCategory + "/" + filename;
            return relativePath;
        } catch (IOException e) {
            throw new RuntimeException("❌ Failed to store file", e);
        }
    }

    /**
     * Save uploaded file in /uploads/category/subCategory/ and return relative path
     * (e.g., "idols/clay/abc123.jpg")
     */
    public String store(MultipartFile file, String category, String subCategory) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file.");
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path folder = rootLocation.resolve(category).resolve(subCategory);
            Files.createDirectories(folder);

            Path destination = folder.resolve(filename).normalize().toAbsolutePath();
            file.transferTo(destination);

            // ✅ return only relative path (no /uploads prefix!)
            String relativePath = "/uploads/" + category.toLowerCase() + "/" + subCategory.toLowerCase() + "/" + filename;
            return relativePath;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }
    }

    /**
     * Convert a stored relative path into a public URL
     */
    public String resolveUrl(String path) {
        return (path == null || path.isBlank())
                ? "/default.png"
                : path.replace("\\", "/");
    }
}


