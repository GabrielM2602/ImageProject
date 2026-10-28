package io.spring.image.demo.application.users;

import io.spring.image.demo.domain.entity.User;
import io.spring.image.demo.domain.exception.DuplicatedTupleException;
import io.spring.image.demo.domain.service.UserService;
import io.spring.image.demo.infra.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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
}
