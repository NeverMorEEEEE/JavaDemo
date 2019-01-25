package com.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
//import org.thymeleaf.spring5.SpringTemplateEngine;
//import org.thymeleaf.spring5.view.ThymeleafViewResolver;
/*import org.thymeleaf.templateresolver.TemplateResolver;*/

@Configuration
public class WebConfig {

//	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
//		configurer.enable();
//	}
	
	/**
	 * 设置视图解析器
	 * 
	 * @param templateEngine
	 * @return
	 */
	/*
	 * @Bean public ViewResolver viewResolver(SpringTemplateEngine templateEngine){
	 * ThymeleafViewResolver resolver = new ThymeleafViewResolver();
	 * resolver.setTemplateEngine(templateEngine); return resolver; }
	 */

	/*	*//**
			 * 设置模板引擎
			 * 
			 * @param templateResolver
			 * @return
			 */

	/*
	 * @Bean public SpringTemplateEngine templateEngine(TemplateResolver
	 * templateResolver){ SpringTemplateEngine engine = new SpringTemplateEngine();
	 * engine.setTemplateResolver(templateResolver); return engine; }
	 * 
	 *//**
		 * 模板解析引擎
		 * 
		 * @return
		 *//*
			 * @Bean public TemplateResolver templateResolver(){ TemplateResolver resolver =
			 * new SpringResourceTemplateResolver();
			 * resolver.setPrefix("/WEB-INF/template/");//设置地址前缀
			 * resolver.setSuffix(".html");//设置后缀 resolver.setCacheable(false);//设置不缓存
			 * resolver.setTemplateMode("HTML5"); return resolver;
			 * 
			 * }
			 */

	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
		characterEncodingFilter.setForceEncoding(true);
		characterEncodingFilter.setEncoding("UTF-8");
		registrationBean.setFilter(characterEncodingFilter);
		return registrationBean;
	}

}
