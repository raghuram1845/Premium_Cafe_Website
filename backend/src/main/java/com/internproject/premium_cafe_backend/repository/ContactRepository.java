package com.internproject.premium_cafe_backend.repository;

import com.internproject.premium_cafe_backend.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {

}