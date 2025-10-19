package com.laraid.ganeshfest.billing;

import com.laraid.ganeshfest.domain.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class BillingConsumer {


    private static final Logger log = LoggerFactory.getLogger(BillingConsumer.class);


    @KafkaListener(topics = "ganesh.fest-orders", groupId = "billing-service")
    public void consume(Order order) {
        log.info("Billing service received order: {} with total {}", order.getId(), order.getTotalAmount());
// TODO: integrate payment/billing system
    }
}
