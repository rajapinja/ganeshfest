package com.laraid.ganeshfest.repo;

import com.laraid.ganeshfest.domain.Category;
import com.laraid.ganeshfest.domain.Product;
import com.laraid.ganeshfest.domain.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByCode(String code);

    List<Product> findByCategory(Category category);

    List<Product> findByCategoryAndSubCategory(Category category, SubCategory subCategory);

    Optional<Product> findFirstByCategoryAndSubCategory(Category category, SubCategory subCategory);

}
