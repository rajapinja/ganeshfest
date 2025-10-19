package com.laraid.ganeshfest.service;

import com.laraid.ganeshfest.domain.Category;
import com.laraid.ganeshfest.domain.Product;
import com.laraid.ganeshfest.domain.ProductImage;
import com.laraid.ganeshfest.domain.SubCategory;
import com.laraid.ganeshfest.dto.ProductDto;
import com.laraid.ganeshfest.dto.ProductUpdateDto;
import com.laraid.ganeshfest.mapper.ProductMapper;
import com.laraid.ganeshfest.repo.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService {

    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;
    private final FileStorageService storage;
    private final ProductMapper productMapper;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getByCategory(Category category) {
        return productRepository.findByCategory(category);
    }

    public List<ProductDto> findByCategoryOrSubCategory(String categoryStr, String subCategoryStr) {
        Category category = findCategory(categoryStr);  // fuzzy match
        List<Product> products;

        if (subCategoryStr != null && !subCategoryStr.isEmpty()) {
            SubCategory subCategory = findSubCategory(subCategoryStr, category); // fuzzy match
            products = productRepository.findByCategoryAndSubCategory(category, subCategory);
        } else {
            products = productRepository.findByCategory(category);
        }

        return products.stream()
                .map(productMapper::toDto)
                .toList();
    }

    public List<Product> getByCategoryAndSubCategory(String categoryStr, String subCategoryStr) {
        try {
            Category category = findCategory(categoryStr);

            if (subCategoryStr != null && !subCategoryStr.isBlank()) {
                SubCategory subCategory = findSubCategory(subCategoryStr, category);
                List<Product> products = productRepository.findByCategoryAndSubCategory(category, subCategory);
                return products != null ? products : List.of();
            }

            List<Product> products = productRepository.findByCategory(category);
            return products != null ? products : List.of();

        } catch (IllegalArgumentException ex) {
            // ❌ invalid category/subcategory → return empty list instead of blowing up
            log.warn("Invalid category/subCategory request: category={}, subCategory={}", categoryStr, subCategoryStr, ex);
            return List.of();
        }
    }

    private Category findCategory(String categoryStr) {
        String normalized = categoryStr
                .toUpperCase()
                .replace("-", "_")
                .replace(" ", "_"); // ✅ handle dash/space

        return Arrays.stream(Category.values())
                .filter(c -> c.name().equals(normalized))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid category: " + categoryStr));
    }

    private SubCategory findSubCategory(String subCategoryStr, Category category) {
        String normalized = subCategoryStr
                .toUpperCase()
                .replace("-", "_")
                .replace(" ", "_");

        return Arrays.stream(SubCategory.values())
                .filter(sc -> sc.name().equals(normalized))
                .filter(sc -> sc.getParent().equals(category))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid subcategory: " + subCategoryStr + " for category: " + category));
    }


    private String normalize(String s) {
        return s.toUpperCase().replaceAll("[\\s\\-_]+", "");
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product addImageUrl(Long productId, String imageUrl, String category, String subCategory) {
        return productRepository.findById(productId)
                .map(product -> {
                    List<ProductImage> images = product.getImages();
                    if (images == null) {
                        images = new ArrayList<>();
                    }

                    ProductImage img = ProductImage.builder()
                            .url(imageUrl)
                            .category(category)
                            .subCategory(subCategory)
                            .build();

                    images.add(img);
                    product.setImages(images);

                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }


    public Long resolveIdByCode(String code) {
        return productRepository.findByCode(code)
                .map(Product::getId)
                .orElseThrow(() -> new RuntimeException("Product not found for code: " + code));
    }

    public Product addOrUpdateImage(String code, String imageUrl, String category, String subCategory) {
        return productRepository.findByCode(code)
                .map(product -> {
                    List<ProductImage> images = product.getImages();
                    if (images == null) {
                        images = new ArrayList<>();
                    }

                    ProductImage img = ProductImage.builder()
                            .url(imageUrl)
                            .category(category)
                            .subCategory(subCategory)
                            .build();

                    images.add(img);
                    product.setImages(images);

                    return productRepository.save(product);
                })
                .orElseGet(() -> {
                    Product newProduct = new Product();
                    newProduct.setCode(code);

                    ProductImage img = ProductImage.builder()
                            .url(imageUrl)
                            .category(category)
                            .subCategory(subCategory)
                            .build();

                    newProduct.setImages(new ArrayList<>(List.of(img)));
                    return productRepository.save(newProduct);
                });
    }

    public Optional<ProductDto> getByCode(String code) {
        return productRepository.findByCode(code)
                .map(productMapper::toDto);
    }

    public ProductDto create(ProductDto dto) {
        Product entity = productMapper.toEntity(dto);
        Product saved = productRepository.save(entity);
        return productMapper.toDto(saved);
    }



    public Optional<Product> updateProduct(Long id, Product product) {
        return productRepository.findById(id)
                .map(existing -> {
                    existing.setName(product.getName());
                    existing.setPrice(product.getPrice());
                    existing.setDescription(product.getDescription());
                    existing.setCategory(product.getCategory());
                    existing.setSubCategory(product.getSubCategory());

                    // ✅ Update full image list (List<ProductImage>)
                    if (product.getImages() != null) {
                        existing.setImages(new ArrayList<>(product.getImages()));
                    }

                    return productRepository.save(existing);
                });
    }


    public boolean deleteProduct(Long id) {
        return productRepository.findById(id)
                .map(existing -> {
                    productRepository.delete(existing);
                    return true;
                })
                .orElse(false);
    }

    public Product removeImageUrl(Long productId, String imageUrl) {
        return productRepository.findById(productId).map(product -> {
            product.getImages().remove(imageUrl);
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product removeImage(Long productId, String url) {
        return productRepository.findById(productId)
                .map(product -> {
                    if (product.getImages() != null) {
                        product.getImages().removeIf(img -> img.getUrl().equals(url));
                    }
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // --- Get by ID ---
    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("❌ Product not found with id: " + id));
    }

    // --- Upload by ID ---
    public Product uploadImage(Long id, String category,
                               String subCategory,MultipartFile file) {
        Product product = getById(id);

        // Save file to storage
        String path = storage.save(file, category, subCategory);

        ProductImage img = ProductImage.builder()
                .url(path)
                .category(product.getCategory() != null ? product.getCategory().name() : null)
                .subCategory(product.getSubCategory() != null ? product.getSubCategory().name() : null)
                .build();

        product.getImages().add(img);
        return productRepository.save(product);
    }

    public Product uploadImageByCategoryAndSubCategory(
            String category,
            String subCategory,
            MultipartFile file,
            String name,
            Double price
    ) {
        String path = storage.save(file, category, subCategory);

        Product product = productRepository.findFirstByCategoryAndSubCategory(
                Category.valueOf(category.toUpperCase()),
                SubCategory.valueOf(subCategory.toUpperCase())
        ).orElseGet(() -> productRepository.save(Product.builder()
                .name(name != null ? name : category + " " + subCategory)
                .category(Category.valueOf(category.toUpperCase()))
                .subCategory(SubCategory.valueOf(subCategory.toUpperCase()))
                .price(price != null ? price : 0.0)
                .images(new ArrayList<>())
                .build()));

        // update if already exists
        if (name != null) product.setName(name);
        if (price != null) product.setPrice(price);

        product.getImages().add(ProductImage.builder()
                .url(path)
                .category(category.toUpperCase())
                .subCategory(subCategory.toUpperCase())
                .build());

        return productRepository.save(product);
    }


    public List<ProductImage> getProductImages(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));
        return product.getImages();
    }


    // --- For Category + SubCategory Level Uploads ---

    public List<ProductDto> getImages(String category, String subCategory) {
        // Fetch all products that belong to this category + subCategory
        List<Product> products = productRepository.findByCategoryAndSubCategory(
                Category.valueOf(category.toUpperCase()),
                SubCategory.valueOf(subCategory.toUpperCase())
        );

        // Flatten all product images
        return products.stream()
                .peek(p -> {
                    // ensure image URLs are resolved (if stored as relative paths)
                    p.setImages(
                            p.getImages().stream()
                                    .map(img -> ProductImage.builder()
                                            .url(storage.resolveUrl(img.getUrl()))
                                            .category(p.getCategory().name())
                                            .subCategory(p.getSubCategory().name())
                                            .build()
                                    ).toList()
                    );
                })
                .map(productMapper::toDto)
                .toList();
    }

    public ProductDto upload(
            String category,
            String subCategory,
            MultipartFile file,
            String name,
            double price
    ) {
        // Save file into category/subcategory folder
        String path = storage.save(file, category, subCategory);

        Category catEnum = Category.valueOf(category.toUpperCase());
        SubCategory subEnum = SubCategory.valueOf(subCategory.toUpperCase());

        // ✅ Always create a new Product (unique product per upload)
        Product product = Product.builder()
                .code(UUID.randomUUID().toString()) // unique product code
                .category(catEnum)
                .subCategory(subEnum)
                .name((name != null && !name.isBlank()) ? name : "Unnamed Product")
                .price(price > 0 ? price : 0.0)
                .images(new ArrayList<>())
                .build();

        // Attach uploaded image
        if (path != null && !path.isBlank()) {
            ProductImage img = ProductImage.builder()
                    .url(path)
                    .category(catEnum.name())
                    .subCategory(subEnum.name())
                    .build();
            product.getImages().add(img);
        }

        Product saved = productRepository.save(product);
        return productMapper.toDto(saved);
    }


    public Product createProductWithImage(String category, String subCategory, String name, Double price, MultipartFile file) {
        String path = storage.save(file, category, subCategory);

        Product product = Product.builder()
                .name(name)
                .price(price)
                .category(Category.valueOf(category.toUpperCase()))
                .subCategory(SubCategory.valueOf(subCategory.toUpperCase()))
                .images(List.of(ProductImage.builder().url(path).build()))
                .build();

        return productRepository.save(product);
    }


    @Transactional
    public Product updateProduct(Long id, ProductUpdateDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));

        if (dto.getName() != null && !dto.getName().isBlank()) {
            product.setName(dto.getName());
        }

        if (dto.getPrice() != null && dto.getPrice() > 0) {
            product.setPrice(dto.getPrice());
        }

        return productRepository.save(product);
    }



}



