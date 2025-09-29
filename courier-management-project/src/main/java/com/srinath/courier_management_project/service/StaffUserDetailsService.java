//package com.srinath.courier_management_project.service;
//
//import com.srinath.courier_management_project.dao.StaffDao;
//import com.srinath.courier_management_project.model.Staff;
//import com.srinath.courier_management_project.model.StaffPrincipal;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class StaffUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private StaffDao staffDao;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        Optional<Staff> staff = staffDao.findByStaffUsername(username);
//        if(staff.isEmpty()){
//            throw new UsernameNotFoundException("Staff User 404");
//        }
//        return new StaffPrincipal(staff.get());
//    }
//}
