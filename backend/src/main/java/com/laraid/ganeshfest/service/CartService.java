package com.laraid.ganeshfest.service;

import com.laraid.ganeshfest.domain.Order;
import com.laraid.ganeshfest.domain.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final OrderService orderService;

    private final List<OrderItem> cart = new ArrayList<>();

    public List<OrderItem> getCart() {
        return cart;
    }

    public void addToCart(OrderItem item) {
        cart.add(item);
    }

    public boolean removeFromCart(int index) {
        if (index >= 0 && index < cart.size()) {
            cart.remove(index);
            return true;
        }
        return false;
    }

    public Order checkout(Long customerId) {
        if (cart.isEmpty()) {
            return null; // or throw custom CartEmptyException
        }

        double total = cart.stream()
                .mapToDouble(i -> i.getUnitPrice() * i.getQuantity())
                .sum();

        Order order = Order.builder()
                .customerId(customerId)
                .totalAmount(total)
                .items(new ArrayList<>(cart))
                .build();

        Order savedOrder = orderService.placeOrder(order);
        cart.clear();

        return savedOrder;
    }
}
