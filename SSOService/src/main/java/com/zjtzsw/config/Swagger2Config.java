package com.zjtzsw.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Swagger2Config {

	@Bean
	public Docket createRestApi() {
		return new Docket(DocumentationType.SWAGGER_2)
		.apiInfo(apiInfo())
		.select()
		.apis(RequestHandlerSelectors.basePackage("com.zjtzsw.modules")).paths(PathSelectors.any()).build();}

	private ApiInfo apiInfo() {
	return new ApiInfoBuilder().title("SSOServer单点登录服务")
			.description("writted by wac")
			.termsOfServiceUrl("^^")
			.contact("wac")
			.license("Copyright 2018-2019分享wac")
			.build();}
}