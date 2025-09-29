package com.srinath.courier_management_project.service;

import com.srinath.courier_management_project.dao.StaffDao;
import com.srinath.courier_management_project.model.Staff;
import com.srinath.courier_management_project.model.UpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.srinath.courier_management_project.model.LoginRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class StaffService {

    @Autowired
    StaffDao staffDao;

    public ResponseEntity<List<Staff>> getAllStaffs() {
        try
        {
            return new ResponseEntity<>(staffDao.findAll(), HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Staff> getStaffById(Integer staffId) {
        try
        {
            return new ResponseEntity<>(staffDao.findById(staffId).get(), HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> addStaff(Staff staff) {

        if (staffDao.findByStaffUsername(staff.getStaffUsername()).isPresent()) {
            return ResponseEntity.status(409).body(
                    Map.of("message", "Username already in use!!"));
        }

        if (staffDao.findByStaffEmail(staff.getStaffEmail()).isPresent()) {
            return ResponseEntity.status(409).body(
                    Map.of("message", "Email already in use!!"));
        }

        if (staffDao.findByStaffMobile(staff.getStaffMobile()).isPresent()) {
            return ResponseEntity.status(409).body(
                    Map.of("message", "Mobile number already in use!!"));
        }

        staffDao.save(staff);

        return ResponseEntity.status(201).body(
                Map.of("message", "Staff Successfully Added!!"));
    }


    public ResponseEntity<?> login(LoginRequest request) {
        return staffDao.findByStaffUsername(request.getUsername())
                .map(staff -> {
                    if (staff.getStaffPwd().equals(request.getPassword())) {

                        if(Objects.equals(staff.getActivity(), "Inactive"))
                            return ResponseEntity.status(401).body(
                                    java.util.Map.of("message", "Your account is Inactive!!"));
                        else
                            return ResponseEntity.ok(
                                    java.util.Map.of(
                                            "message", "Login successful",
                                            "name", staff.getStaffName(),
                                            "staffId", staff.getStaffId()
                                    )
                            );
                    } else {
                        return ResponseEntity.status(401).body(
                                java.util.Map.of("message", "Invalid password"));
                    }
                })
                .orElse(ResponseEntity.status(404).body(
                        java.util.Map.of("message", "Username not found")));
    }

    public ResponseEntity<Staff> updateStaffById(Integer staffId, String activity) {
        try
        {

            return staffDao.findById(staffId)
                    .map(staff -> {
                        staff.setActivity(activity);
                        return ResponseEntity.ok(staffDao.save(staff));
                    }).get();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> deleteStaffById(Integer staffId) {
        if (staffDao.existsById(staffId)) {
            staffDao.deleteById(staffId);
            return ResponseEntity.ok(Map.of("message", "Staff deleted successfully!!"));
        } else {
            return new ResponseEntity<>("No Staff data found!!", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> updatePassword(UpdateRequest staff) {
        return staffDao.findByStaffUsername(staff.getUsername()).map(
                data->{
                    if(data.getStaffEmail().equals(staff.getEmail())){
                        data.setStaffPwd(staff.getPassword());
                        return ResponseEntity.ok(staffDao.save(data));
                    }
                    else{
                        return ResponseEntity.status(401).body(
                                java.util.Map.of("message", "Incorrect email.. Try again!!"));
                    }
                }
        ).orElse(
         staffDao.findByStaffEmail(staff.getEmail()).map(
                        data->{
                            return ResponseEntity.status(401).body(
                                   Map.of("message", "Incorrect username.. Try again!!"));
                        }
                ).orElse(
                         ResponseEntity.status(404).body(
                java.util.Map.of("message", "Username & Email combination not found!!!"))
                )
        );

    }
}
