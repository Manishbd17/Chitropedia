package com.manish.Albums.security;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

import org.springframework.stereotype.Component;

@Component
final class KeyGenerationUtils {

    private KeyGenerationUtils() {}

    static KeyPair generateRsaKey() {
        KeyPair keyPair; 
        try{
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA"); 
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        } catch (Exception ex) {
            throw new IllegalStateException(ex); 
        }
        return keyPair; 
    }
}
