package com.srinath.courier_management_project.controller;

import com.srinath.courier_management_project.model.LoginRequest;
import com.srinath.courier_management_project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return adminService.login(request);
    }
}
