package com.laraid.ganeshfest.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring.kafka.topic")
@Data
public class KafkaTopicProperties {

    private String ganeshFestOrders;
    private String ganeshFestBilling;
    private String ganeshFestCartItems;
    private String ganeshFestAiOrders;


}
