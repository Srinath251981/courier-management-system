package com.srinath.courier_management_project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Admin {

    @Id
    private String adUsername;
    private String adPassword;
}
