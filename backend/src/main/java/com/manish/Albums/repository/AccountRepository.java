package com.manish.Albums.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manish.Albums.model.Account;

public interface AccountRepository extends JpaRepository<Account,Long> {

    Optional<Account> findByEmail(String email); 

}
