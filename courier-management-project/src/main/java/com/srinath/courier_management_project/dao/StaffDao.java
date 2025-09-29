package com.srinath.courier_management_project.dao;

import com.srinath.courier_management_project.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface StaffDao extends JpaRepository<Staff,Integer> {

    Optional<Staff> findByStaffUsername(String username);
    Optional<Staff> findByStaffEmail(String email);
    Optional<Staff> findByStaffMobile(BigInteger number);
}
