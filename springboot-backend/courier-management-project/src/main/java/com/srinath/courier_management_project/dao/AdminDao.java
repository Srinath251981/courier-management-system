package com.srinath.courier_management_project.dao;

import com.srinath.courier_management_project.model.Admin;
import com.srinath.courier_management_project.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDao extends JpaRepository<Admin,String>{

}
