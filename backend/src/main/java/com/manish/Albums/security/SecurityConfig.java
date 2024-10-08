package com.manish.Albums.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;


import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    // private final RsaKeyProperties rsaKeys; 

    // public SecurityConfig(RsaKeyProperties rsaKeys) {
    //     this.rsaKeys = rsaKeys; 
    // }

    // @Bean 
    // public InMemoryUserDetailsManager users() {
    //     return new InMemoryUserDetailsManager(
    //                 User.withUsername("Manish")
    //                     .password("{noop}password")
    //                     .authorities("read")
    //                     .build()); 
    // }

    private RSAKey rsaKey; 

    @Bean 
    public JWKSource<SecurityContext> jwkSource() {
        rsaKey = Jwks.generateRsa(); 
        JWKSet jwkSet = new JWKSet(rsaKey); 
        return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet); 
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); 
    }


    @Bean
    public AuthenticationManager authManager(UserDetailsService userDetailsService) {
        var authProvider = new DaoAuthenticationProvider(); 
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(userDetailsService); 
        return new ProviderManager(authProvider);
    }

    @Bean 
    JwtDecoder jwtDecoder() throws JOSEException {
        return NimbusJwtDecoder.withPublicKey(rsaKey.toRSAPublicKey()).build(); 
    }

    @Bean
    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwks) {
        // JWK jwk = new RSAKey.Builder(rsaKeys.publicKey()).privateKey(rsaKeys.privateKey()).build(); 
        // JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk)); 
        // return new NimbusJwtEncoder(jwks); 
        return new NimbusJwtEncoder(jwks); 
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         http  
               .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin())) 
               .authorizeHttpRequests(request -> {
                    request.requestMatchers("/**", "/api/v1/auth/token", "/api/v1/auth/users/add", "/swagger-ui/**", "/v3/api-docs/**").permitAll();
                    request.requestMatchers("/api/v1/auth/users","/api/v1/auth/users/{user_id}/update-authorities").hasAuthority("SCOPE_ADMIN");
                    request.requestMatchers("/api/v1/auth/profile","/api/v1/auth/profile/update-password", "/api/v1/auth/profile/delete").authenticated();
               })
               .oauth2ResourceServer(oauth2-> oauth2.jwt(Customizer.withDefaults()))
               .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
              
                http.csrf(AbstractHttpConfigurer::disable);
                http.headers(headers->headers.frameOptions(frameOptions-> frameOptions.disable())); 

        return http.build(); 
    }


}
