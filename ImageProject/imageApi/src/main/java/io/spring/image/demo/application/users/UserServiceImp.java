package io.spring.image.demo.application.users;

import io.spring.image.demo.application.jwt.JwtService;
import io.spring.image.demo.domain.AccessToken;
import io.spring.image.demo.domain.entity.User;
import io.spring.image.demo.domain.exception.DuplicatedTupleException;
import io.spring.image.demo.domain.service.UserService;
import io.spring.image.demo.infra.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwService;

    @Override
    public User getByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public User save(User user){
        var possibleUser = getByEmail(user.getEmail());
        if(possibleUser != null){
            throw new DuplicatedTupleException("user already exists");
        }
        passwordEncoder(user);
        return userRepository.save(user);
    }

    @Override
    public AccessToken autenticate(String email, String password){
        var user = getByEmail(email);
        if(user == null){
            return null;
        }
        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if(matches){
            return jwService.generateToken(user);
        }
        return null;
    }
    private void passwordEncoder( User user){
        String rawPassword = user.getPassword();
        String encodePassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodePassword);
    }
}
