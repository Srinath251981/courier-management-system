package com.srinath.courier_management_project.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigInteger;

@Data
@Entity
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer staffId;
    private String staffName;
    private String staffUsername;
    private BigInteger staffMobile;
    private String staffEmail;
    private String staffPwd;
    private String activity = "Active";
}