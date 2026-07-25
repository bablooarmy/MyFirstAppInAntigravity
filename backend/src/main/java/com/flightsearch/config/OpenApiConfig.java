package com.flightsearch.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI flightSearchOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Flight Search API Engine")
                        .description("REST API documentation for global flight search, airport auto-complete, and booking management.")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("SkyWings API Team")
                                .email("api-support@skywings.com")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server")
                ));
    }
}
