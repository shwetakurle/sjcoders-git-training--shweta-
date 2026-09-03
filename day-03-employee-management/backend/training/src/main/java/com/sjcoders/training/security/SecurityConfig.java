package com.sjcoders.training.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                // Register and login
                .requestMatchers("/api/auth/**")
                .permitAll()

                // Allow Spring Boot error response
                .requestMatchers("/error")
                .permitAll()

                // ADMIN and USER can View/Search
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/employees",
                    "/api/employees/**"
                )
                .hasAnyAuthority("ADMIN", "USER")

                // ADMIN can Add
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/employees",
                    "/api/employees/**"
                )
                .hasAuthority("ADMIN")

                // ADMIN can Edit
                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/employees",
                    "/api/employees/**"
                )
                .hasAuthority("ADMIN")

                // ADMIN can Delete
                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/employees",
                    "/api/employees/**"
                )
                .hasAuthority("ADMIN")

                .anyRequest()
                .authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}