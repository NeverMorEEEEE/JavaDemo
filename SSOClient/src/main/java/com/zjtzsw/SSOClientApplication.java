package com.zjtzsw;

import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
//import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
/*import org.springframework.boot.web.support.SpringBootServletInitializer;*/
import org.springframework.context.annotation.Bean;

import com.zjtzsw.modules.socketService.WacWebSocketSerivce;

@ServletComponentScan
@SpringBootApplication
public class SSOClientApplication extends SpringBootServletInitializer {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SSOClientApplication.class, args);
		  new WacWebSocketSerivce().run(8086);  

	}
/*	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SSOClientApplication.class);
	}

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		super.onStartup(servletContext);
	}

	@Bean 
	public EmbeddedServletContainerCustomizer containerCustomizer(){ 
		return new EmbeddedServletContainerCustomizer() { 
			@Override 
			public void customize(ConfigurableEmbeddedServletContainer container) { 
				container.setSessionTimeout(6000,TimeUnit.MILLISECONDS);//单位为S 
			} 
		}; 
	}*/
}
