package com.laraid.ganeshfest.controller;

import com.laraid.ganeshfest.domain.Order;
import com.laraid.ganeshfest.domain.OrderItem;
import com.laraid.ganeshfest.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public List<OrderItem> getCart() {
        return cartService.getCart();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody OrderItem item) {
        cartService.addToCart(item);
        return ResponseEntity.ok("Item added to cart");
    }

    @DeleteMapping("/remove/{index}")
    public ResponseEntity<String> removeFromCart(@PathVariable int index) {
        return cartService.removeFromCart(index)
                ? ResponseEntity.ok("Item removed")
                : ResponseEntity.badRequest().body("Invalid index");
    }

    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(@RequestParam Long customerId) {
        Order order = cartService.checkout(customerId);
        return (order != null) ? ResponseEntity.ok(order)
                : ResponseEntity.badRequest().build();
    }
}
