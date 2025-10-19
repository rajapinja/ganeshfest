package com.laraid.ganeshfest.ai;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class AiOrderProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public AiOrderProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishAiOrder(Long customerId, String designUrl) {
        String payload = String.format("{\"customerId\":%d,\"designUrl\":\"%s\"}", customerId, designUrl);
        kafkaTemplate.send("ganesh.fest-ai-orders", payload);
    }
}

