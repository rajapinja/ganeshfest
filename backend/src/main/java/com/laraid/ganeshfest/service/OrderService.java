package com.laraid.ganeshfest.service;

import com.laraid.ganeshfest.domain.Order;
import com.laraid.ganeshfest.repo.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;


    public Order placeOrder(Order order) {
        order.setCreatedAt(Instant.from(LocalDateTime.now()));
        order.getItems().forEach(item -> item.setOrder(order));
        Order saved = orderRepository.save(order);


// publish order event to Kafka
        kafkaTemplate.send("orders", saved);


        return saved;
    }
}