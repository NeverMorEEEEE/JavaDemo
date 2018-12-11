package com.zjtzsw;

import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;

import com.zjtzsw.common.utils.SpringContextUtils;

//import com.zjtzsw.common.utils.SpringContext;

//@ServletComponentScan
@SpringBootApplication
public class SsoServiceApplication extends SpringBootServletInitializer {

	public static void main(String[] args) throws ServletException {
		ApplicationContext app = SpringApplication.run(SsoServiceApplication.class, args);
		SpringContextUtils.setApplicationContext(app);
	}
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SsoServiceApplication.class);
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
	}
}
