package com.manish.Albums.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.manish.Albums.model.Account;
import com.manish.Albums.service.AccountService;
import com.manish.Albums.util.constants.Authority;

@Component
public class SeedData implements CommandLineRunner {
	
	@Autowired
	private AccountService accountService;

	@Override
	public void run(String... args) throws Exception {
		Account account01 = new Account(); 
		Account account02 = new Account(); 
		
		account01.setEmail("manishblr23@gmail.com");
		account01.setPassword("pass893");
		account01.setAuthorities(Authority.USER.toString());
		accountService.save(account01);
		
		account02.setEmail("admin@admin.com");
		account02.setPassword("pass893");
		account02.setAuthorities(Authority.ADMIN.toString());
		accountService.save(account02);
	}

}
