package com.laraid.ganeshfest.billing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillingMessage {
    private Long orderId;
    private Double amount;
    private String status; // e.g., "PAID", "FAILED"
    private String customerEmail;
}
