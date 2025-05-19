package com.example.inventoryapi;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // No extra code needed here for now
}
