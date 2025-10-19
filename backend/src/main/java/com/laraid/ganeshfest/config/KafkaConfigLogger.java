package com.laraid.ganeshfest.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class KafkaConfigLogger {

    private final KafkaProperties kafkaProperties;
    private final KafkaTopicProperties kafkaTopicProperties;


    @Bean
    public AdminClient kafkaAdminClient() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaProperties.getBootstrapServers());
        return AdminClient.create(configs);
    }

    @Bean
    public ApplicationRunner topicLister(AdminClient adminClient) {
        return args -> {
            System.out.println("🧾 Listing Kafka topics:");
            adminClient.listTopics().names().get().forEach(System.out::println);
        };
    }

    @PostConstruct
    public void logTopics() {
        System.out.println("✅ Topics:");
        System.out.println(" - Ganesh Fest Orders: " + kafkaTopicProperties.getGaneshFestOrders());
        System.out.println(" - Ganesh Fest Billing: " + kafkaTopicProperties.getGaneshFestBilling());
        System.out.println(" - Ganesh Fest Cart Items: " + kafkaTopicProperties.getGaneshFestCartItems());
        System.out.println(" - Ganesh Fest AI Orders: " + kafkaTopicProperties.getGaneshFestAiOrders());
    }
}

