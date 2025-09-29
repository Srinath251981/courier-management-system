package com.srinath.courier_management_project.service;

import com.srinath.courier_management_project.dao.CourierDao;
import com.srinath.courier_management_project.model.Courier;
import com.srinath.courier_management_project.model.Staff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CourierService {

    @Autowired
    CourierDao courierDao;

    public ResponseEntity<List<Courier>> getAllCouriers() {
        try
        {
            return new ResponseEntity<>(courierDao.findAll(), HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Courier> getCourierById(Integer courierId) {
        try
        {
            return new ResponseEntity<>(courierDao.findById(courierId).get(), HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> addCourier(Courier courier) {
        try
        {
            courierDao.save(courier);
            return new ResponseEntity<>("Courier Successfully Added!!",HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Courier Not Added!!",HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<Courier>> getCourierByStaffId(Integer staffId) {
        try
        {
            return new ResponseEntity<>(courierDao.findByStaffId(staffId), HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Courier> updateCourierById(Integer courierId, String status) {
        try
        {
            return courierDao.findById(courierId)
                    .map(courier -> {

                        courier.setStatus(status);
                        return ResponseEntity.ok(courierDao.save(courier));
                    }).get();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> deleteCourierById(Integer courierId) {
        if (courierDao.existsById(courierId)) {
            courierDao.deleteById(courierId);
            return ResponseEntity.ok(Map.of("message", "Courier deleted successfully!!"));
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "No courier data found!!"));
        }
    }
}
