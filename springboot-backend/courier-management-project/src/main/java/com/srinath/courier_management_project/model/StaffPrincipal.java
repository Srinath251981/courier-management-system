//package com.srinath.courier_management_project.model;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.Collections;
//import java.util.List;
//
//public class StaffPrincipal implements UserDetails {
//
//    @Autowired
//    private Staff staff;
//
//    public StaffPrincipal(Staff staff) {
//        this.staff = staff;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.singleton(new SimpleGrantedAuthority("STAFF"));
//    }
//
//    @Override
//    public String getPassword() {
//        return staff.getStaffPwd();
//    }
//
//    @Override
//    public String getUsername() {
//        return staff.getStaffUsername();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return UserDetails.super.isAccountNonExpired();
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return UserDetails.super.isAccountNonLocked();
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return UserDetails.super.isCredentialsNonExpired();
//    }
//}
