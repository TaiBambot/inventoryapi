package com.example.inventoryapi;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sales")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public ResponseEntity<?> submitSale(@RequestBody SaleDTO saleDTO) {
        try {
            Sale savedSale = saleService.saveSale(saleDTO);
            return ResponseEntity.ok(savedSale);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to save sale: " + e.getMessage());
        }
    }
}
