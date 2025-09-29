package com.srinath.courier_management_project.service;

import com.srinath.courier_management_project.dao.AdminDao;
import com.srinath.courier_management_project.model.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    AdminDao adminDao;

    public ResponseEntity<?> login(LoginRequest request) {
        return adminDao.findById(request.getUsername())
                .map(admin -> {
                    if (admin.getAdPassword().equals(request.getPassword())) {
                            return ResponseEntity.ok(java.util.Map.of("message", "Login successful"));
                    } else {
                        return ResponseEntity.status(401).body(
                                java.util.Map.of("message", "Invalid password!!"));
                    }
                })
                .orElse(ResponseEntity.status(404).body(
                        java.util.Map.of("message", "Incorrect Username!!")));
    }
}
