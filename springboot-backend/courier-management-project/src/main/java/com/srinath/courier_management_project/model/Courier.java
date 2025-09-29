package com.srinath.courier_management_project.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
public class Courier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courierId;
    private String senderName;
    private String senderAddress;
    private BigInteger senderMobile;
    private String recipientAddress;
    private BigInteger recipientMobile;
    private String recipientName;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDate courierDate;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalTime courierTime;
    private String courierType;
    private double weight = 0;
    private String status = "Consignment Booked";
    private Integer staffId;
}
