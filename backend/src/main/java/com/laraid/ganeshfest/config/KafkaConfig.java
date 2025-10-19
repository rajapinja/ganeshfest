package com.laraid.ganeshfest.config;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConfig {

    private final KafkaProperties kafkaProperties;
    private final KafkaTopicProperties props;

    public KafkaConfig(KafkaProperties kafkaProperties, KafkaTopicProperties props) {
        this.kafkaProperties = kafkaProperties;
        this.props = props;
    }

    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaProperties.getBootstrapServers());
        return new KafkaAdmin(configs);
    }

    @Bean
    public NewTopic ganeshFestOrdersTopic() {
        return TopicBuilder.name(props.getGaneshFestOrders())
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic ganeshFestBillingTopic() {
        return TopicBuilder.name(props.getGaneshFestBilling())
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic ganeshFestCartItemsTopic() {
        return TopicBuilder.name(props.getGaneshFestCartItems())
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic ganeshFestAiOrdersTopic(){
        return TopicBuilder.name(props.getGaneshFestAiOrders())
                .partitions(3)
                .replicas(1)
                .build();
    }

}
