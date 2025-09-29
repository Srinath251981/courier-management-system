package com.srinath.courier_management_project.controller;

import com.srinath.courier_management_project.model.Courier;
import com.srinath.courier_management_project.model.Staff;
import com.srinath.courier_management_project.service.CourierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("courier")
@CrossOrigin(origins = "http://localhost:5173")
public class CourierController {

    @Autowired
    CourierService courierService;

    @GetMapping("allCouriers")
    public ResponseEntity<List<Courier>> getAllCouriers(){
        return courierService.getAllCouriers();
    }

    @GetMapping("search/{courierId}")
    public ResponseEntity<Courier> getCourierById(@PathVariable Integer courierId){
        return courierService.getCourierById(courierId);
    }

    @GetMapping("staff")
    public ResponseEntity<List<Courier>> getCourierByStaffId(@RequestParam Integer staffId){
        return courierService.getCourierByStaffId(staffId);
    }

    @PostMapping("addNew")
    public ResponseEntity<String> addQuestion(@RequestBody Courier courier){
        return courierService.addCourier(courier);
    }

    @PutMapping("update/{courierId}")
    public ResponseEntity<Courier> updateCourier(@PathVariable Integer courierId, @RequestBody String status){
        return courierService.updateCourierById(courierId, status);
    }

    @DeleteMapping("delete/{courierId}")
    public ResponseEntity<?> deleteCourierById(@PathVariable Integer courierId){
        return courierService.deleteCourierById(courierId);
    }

}
