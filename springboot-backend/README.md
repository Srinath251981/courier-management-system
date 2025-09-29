**Courier Management System - Backend (Spring Boot)**

     This is the backend service for the Courier Management System, built with Spring Boot.
     It provides REST APIs for courier management, staff management, authentication, and tracking.



**Features :**

       Courier Management (Add, update, delete, track)
       
       Staff Management (Register, manage staff accounts)
       
       Role-based Access Control (Admin / Staff)
       
       Database Integration with PostgreSQL/MySQL
       
       REST APIs for frontend integration
       
       Authentication & Authorization using Spring Security + JWT (in development)



**Tech Stack :**

       Java 24+
       
       Spring Boot 3.x
       
       Spring Data JPA (Hibernate)
       
       PostgreSQL / MySQL
       
       Maven



A snippet of the APIs are shown below : 

<img width="281" height="570" alt="image" src="https://github.com/user-attachments/assets/b326cdee-8906-4553-b58b-a3982c76d1da" />


**Project Structure**

     springboot-backend/
     │── courier-management-project/src/main/java/com/srinath/courier_management_projet/
     |   |
     │   ├── controller/      # REST controllers
     │   ├── service/         # Business logic
     │   ├── repository/      # Data access layer
     │   ├── model/           # Entities (Courier, Staff, etc.)
     │   
     │
     │── src/main/resources/
     │   ├── application.properties
     │
     │── pom.xml              # Maven dependencies



