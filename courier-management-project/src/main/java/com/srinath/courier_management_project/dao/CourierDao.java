package com.srinath.courier_management_project.dao;

import com.srinath.courier_management_project.model.Courier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface CourierDao extends JpaRepository<Courier,Integer> {
    List<Courier> findByStaffId(Integer staffId);
}
