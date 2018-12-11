package com.zjtzsw.config;

import javax.servlet.DispatcherType;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zjtzsw.common.filter.SessionClientFilter;
import com.zjtzsw.common.xss.XssFilter;

/**
 * Filter配置
 * 
 * @author hhj
 * @date 2017年9月16日 上午10:54:49
 */
@Configuration
public class FilterConfig {
	
	@Value("${sso.url}")
    private String ssourl;

    @Bean
    public FilterRegistrationBean xssFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setDispatcherTypes(DispatcherType.REQUEST);
        registration.setFilter(new XssFilter());
        registration.addUrlPatterns("/*");
        registration.setName("xssFilter");
        registration.setOrder(Integer.MAX_VALUE-1);
        return registration;
    }
    
    @Bean
    public FilterRegistrationBean SSOFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setDispatcherTypes(DispatcherType.REQUEST);
        registration.setFilter(new SessionClientFilter());
        registration.addUrlPatterns("/demo/*");
        registration.setName("sessionFilter");
        registration.setOrder(Integer.MAX_VALUE);
        System.out.println("set SsoFilter_ssourl :" + ssourl);
        registration.addInitParameter("ssourl", ssourl);
        return registration;
    }
}
