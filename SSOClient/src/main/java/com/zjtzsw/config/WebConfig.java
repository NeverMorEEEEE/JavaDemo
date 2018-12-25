package com.zjtzsw.config;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;

import freemarker.template.TemplateException;

/**
 * spring mvc 配置
 * 
 * @author hhj
 *
 */
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
//        super.configureMessageConverters(converters);
//        converters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
    	
    	 super.configureMessageConverters(converters);
         //1.需要定义一个convert转换消息的对象;
         FastJsonHttpMessageConverter fastJsonHttpMessageConverter = new FastJsonHttpMessageConverter();
         //2.添加fastJson的配置信息，比如：是否要格式化返回的json数据;
         FastJsonConfig fastJsonConfig = new FastJsonConfig();
         fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
         //3处理中文乱码问题
         List<MediaType> fastMediaTypes = new ArrayList<>();
         fastMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
         //4.在convert中添加配置信息.
         fastJsonHttpMessageConverter.setSupportedMediaTypes(fastMediaTypes);
         fastJsonHttpMessageConverter.setFastJsonConfig(fastJsonConfig);
         //5.将convert添加到converters当中.
         converters.add(fastJsonHttpMessageConverter);
   }

//    @Override
//    public void configureViewResolvers(ViewResolverRegistry registry) {
////        registry.jsp("/jsp/", ".jsp");
//    
//    }

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/**").addResourceLocations("/static/");
//    }
    /*
    addViewControllers可以方便的实现一个请求直接映射成视图，而无需书写controller
    registry.addViewController("请求路径").setViewName("请求页面文件路径")
     */
    
    
//    @Bean
//    public ViewResolver viewResolver() {
//        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
//        resolver.setCache(true);
//        resolver.setPrefix("");
//        resolver.setSuffix(".ftl");
//        resolver.setContentType("text/html; charset=UTF-8");
//        return resolver;
//    }
 
//    @Bean
//    public FreeMarkerConfigurer freemarkerConfig() throws IOException, TemplateException {
//        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
//        configurer.setTemplateLoaderPaths("classpath:/templates/");
//        configurer.setDefaultEncoding("UTF-8");
//        return configurer;
//    }

}
