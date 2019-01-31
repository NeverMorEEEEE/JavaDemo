package com.zjtzsw.config;

import java.nio.charset.Charset;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * spring mvc 配置
 * 
 * @author hhj
 *
 */
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

//    @Override
//    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
//        super.configureMessageConverters(converters);
//        converters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
//    }

//    @Override
//    public void configureViewResolvers(ViewResolverRegistry registry) {
//        registry.jsp("/jsp/", ".jsp");
//    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    }
    /*
    addViewControllers可以方便的实现一个请求直接映射成视图，而无需书写controller
    registry.addViewController("请求路径").setViewName("请求页面文件路径")
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry ) {
        registry.addViewController( "/" ).setViewName( "forward:/modules/home/LogonDialog" );
//        registry.addViewController( "/" ).setViewName( "/modules/home/LogonDialog" );
        registry.setOrder( Ordered.HIGHEST_PRECEDENCE );
        super.addViewControllers( registry );
    } 

}
