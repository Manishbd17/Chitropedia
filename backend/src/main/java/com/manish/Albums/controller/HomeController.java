package com.manish.Albums.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowedHeaders = "*")
@Tag(name = "Home Controller", description = "Demo Controller")
public class HomeController {
    @GetMapping("/")
    @Operation(summary = "Demo API")
    public String demo() {
        return "Hello World";
    }

}
