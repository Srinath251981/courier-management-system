package com.srinath.courier_management_project.model;

import lombok.Data;

@Data
public class UpdateRequest {
    private String username;
    private String email;
    private String password;
}
