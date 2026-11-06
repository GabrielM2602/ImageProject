package io.spring.image.demo.application.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class SecurityKeyGenerator {
    private SecretKey key;

    public SecretKey getKey(){
        if(key == null){
            return Jwts.SIG.HS256.key().build();        }
        return key;
    }
}
