package com.manish.Albums.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.*;

@Configuration
@OpenAPIDefinition(
  info =@Info(
    title = "Demo API",
    version = "Verions 1.0",
    contact = @Contact(
      name = "Manish", email = "manishblr23@gmail.com", url = "manishblr23@gmail.com"
    ),
    license = @License(
      name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
    ),
    termsOfService = "manishblr23@gmail.com/",
    description = "Albums API Spring Boot"
  )
)
public class SwaggerConfig {
    
}
