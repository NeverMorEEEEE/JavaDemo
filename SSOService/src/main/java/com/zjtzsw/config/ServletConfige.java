package com.zjtzsw.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.servlet.DispatcherType;
import javax.servlet.Servlet;

import org.apache.http.client.HttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.zjtzsw.common.xss.XssFilter;


/**
 * servletr配置
 * 
 * @author wac
 * @date 2017年9月16日 上午10:54:49
 */
//@ConfigurationProperties(prefix = "icv") 
@Component 
@PropertySource("classpath:icv.properties")
public class ServletConfige {
	private final static Logger logger = LoggerFactory.getLogger(ServletConfige.class);
	
	
	
//	@Value("${icv.bookName}")
	@Value("${api.host:http://192.3.3.237:7003/OSBProject/proxy/share}")
    private String bookName; // 
    @Value("${icv.serverUrl}")
    private String serverUrl; // 
    @Value("${icv.serverContext}")
    private String serverContext; // 
    @Value("${icv.appKey}")
    private String appKey; //
    
    
    public ServletConfige(){
    	logger.info("构造ServletConfige中！");
    	 Properties prop = new Properties();
    	 // 使用ClassLoader加载properties配置文件生成对应的输入流
    	 InputStream in = this.getClass().getClassLoader().getResourceAsStream("icv.properties");
    	 // 使用properties对象加载输入流
    	 try {
    		 prop.load(in);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//    	 System.out.println();
    	 setBookName(prop.getProperty("icv.bookName"));
    	 setServerContext(prop.getProperty("icv.serverContext"));
    	 setServerUrl(prop.getProperty("icv.serverUrl"));
    	 setAppKey(prop.getProperty("icv.appKey"));
    }

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getServerUrl() {
		return serverUrl;
	}

	public void setServerUrl(String serverUrl) {
		this.serverUrl = serverUrl;
	}

	public String getServerContext() {
		return serverContext;
	}

	public void setServerContext(String serverContext) {
		this.serverContext = serverContext;
	}

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	/**

     * 代码注册servlet(不需要@ServletComponentScan注解)

     * @return

     */
	
//
//    @Bean
//    public ServletRegistrationBean servletRegistrationBean() {
//    	logger.info("初始化Servlet!");
//    	ServletRegistrationBean reg = new ServletRegistrationBean();
//    	reg.setServlet(new ProxyServlet());
//    	reg.addUrlMappings( "/filext-api");
//    	reg.addInitParameter("book_name", bookName);
//    	reg.addInitParameter("server_url", serverUrl);
//    	reg.addInitParameter("server_context", serverContext);
//    	reg.addInitParameter("app_key", appKey);
//        // ServletName默认值为首字母小写，即myServlet1
//        return reg;
//    }

	@Override
	public String toString() {
		return "ServletConfige [bookName=" + bookName + ", serverUrl="
				+ serverUrl + ", serverContext=" + serverContext + ", appKey="
				+ appKey + "]";
	}
    
    
}
