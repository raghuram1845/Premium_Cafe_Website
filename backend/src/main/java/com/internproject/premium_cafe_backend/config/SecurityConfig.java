package com.internproject.premium_cafe_backend.config;

import com.internproject.premium_cafe_backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // CORS
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // User Authentication
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/users",
                                "/api/users/login"
                        ).permitAll()

                        // Customer Profile
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/users/*/profile"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/users/*/profile"
                        ).authenticated()

                        // User Management
                        .requestMatchers(
                                "/api/users/**"
                        ).hasRole("ADMIN")

                        // Menu Items
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/menu-items",
                                "/api/menu-items/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/menu-items"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/menu-items/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/menu-items/**"
                        ).hasRole("ADMIN")

                        // Tables
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/tables",
                                "/api/tables/**"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/tables"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/tables/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/tables/**"
                        ).hasRole("ADMIN")

                        // Categories
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/categories",
                                "/api/categories/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/categories"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/categories/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/categories/**"
                        ).hasRole("ADMIN")

                        // Events
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/events",
                                "/api/events/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/events"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/events/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/events/**"
                        ).hasRole("ADMIN")

                        // Contacts
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/contacts"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/contacts",
                                "/api/contacts/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/contacts/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/contacts/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/contacts/**"
                        ).hasRole("ADMIN")

                        // Everything Else
                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    // CORS

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "https://premium-cafe-website-five.vercel.app/",
                        "http://localhost:5173",
                        "https://premium-cafe-website-13h3r4w7s-raghuram1845s-projects.vercel.app"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    // Password Encoder

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }
}