package com.smartcity.issues.config;
import com.smartcity.issues.entity.Role;
import com.smartcity.issues.entity.User;
import com.smartcity.issues.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Optional<User> existingAdmin = userRepository.findByEmail("admin@smartcity.com");

            User admin = existingAdmin.orElseGet(User::new);
            admin.setFullName("System Admin");
            admin.setEmail("admin@smartcity.com");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ROLE_ADMIN);
            userRepository.save(admin);
        };
    }
}
