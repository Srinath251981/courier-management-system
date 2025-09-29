package com.srinath.courier_management_project.controller;

import com.srinath.courier_management_project.model.LoginRequest;
import com.srinath.courier_management_project.model.Staff;
import com.srinath.courier_management_project.model.UpdateRequest;
import com.srinath.courier_management_project.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("staff")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    @Autowired
    StaffService staffService;

    @GetMapping("allStaffs")
    public ResponseEntity<List<Staff>> getAllStaffs(){
        return staffService.getAllStaffs();
    }

    @GetMapping("search/{staffId}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Integer staffId){
        return staffService.getStaffById(staffId);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        return staffService.login(request);

    }

    @PostMapping("register")
    public ResponseEntity<?> addQuestion(@RequestBody Staff staff){
        return staffService.addStaff(staff);
    }

    @PutMapping("update/{staffId}")
    public ResponseEntity<Staff> updateCourier(@PathVariable Integer staffId, @RequestBody String activity){
        return staffService.updateStaffById(staffId, activity);
    }

    @DeleteMapping("delete/{staffId}")
    public ResponseEntity<?> deleteStaffById(@PathVariable Integer staffId){
        return staffService.deleteStaffById(staffId);
    }

    @PostMapping("updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UpdateRequest staff){
        return staffService.updatePassword(staff);
    }

}
