package com.example.inventoryapi;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SaleService {

    private final SaleRepository saleRepository;

    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    @Transactional
    public Sale saveSale(SaleDTO saleDTO) {
        Sale sale = new Sale();

        sale.setCustomerName(saleDTO.getCustomerName());

        // Parse the date string to LocalDateTime
        if (saleDTO.getDate() != null && !saleDTO.getDate().isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
            LocalDateTime date = LocalDateTime.parse(saleDTO.getDate(), formatter);
            sale.setDate(date);
        } else {
            sale.setDate(LocalDateTime.now());
        }

        List<SaleProduct> saleProducts = saleDTO.getProducts().stream().map(pdto -> {
            SaleProduct sp = new SaleProduct();
            sp.setName(pdto.getName());
            sp.setQuantity(pdto.getQuantity());
            sp.setPrice(pdto.getPrice());
            sp.setSale(sale);
            return sp;
        }).collect(Collectors.toList());

        sale.setProducts(saleProducts);

        return saleRepository.save(sale);
    }
}
