package com.anteris.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@SpringBootApplication
@EnableSwagger2
public class BackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public Docket swaggerConfiguration() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				//.paths(PathSelectors.ant("/api/*"))
				.apis(RequestHandlerSelectors.basePackage("com.anteris"))
				.build();
	}

	private ApiInfo infoDetail() {
		return new ApiInfo(
			"ANTERIS Rest API Documentation",
			"Documentation",
			"1.0",
			"Free to use",
			new Contact("Hamza Chebil", "github.com/ch-hamza", "hamzachebil40@gmail.com"),
			"GPL-3.0 Licence",
			"https://opensource.org/licenses/GPL-3.0",
			Collections.emptyList()
		);
	}
}
