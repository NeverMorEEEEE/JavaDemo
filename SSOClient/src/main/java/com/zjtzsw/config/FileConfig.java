package com.zjtzsw.config;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Title FileConfig
 * @descrption 配置tomcat容器setMaxPostSize大小
 * @author hqq
 * @date 20180412
 * @version 1.0
 */
@Configuration
public class FileConfig {
	// Set maxPostSize of embedded tomcat server to 10 megabytes (default is 2 MB, not large enough to support file uploads > 1.5 MB)
	private final static Logger logger = LoggerFactory.getLogger(FileConfig.class);
	
	/*@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() throws Exception {
		logger.info("配置tomcat容器setMaxPostSize为50MB..");
	    return (ConfigurableEmbeddedServletContainer container) -> {
	        if (container instanceof TomcatEmbeddedServletContainerFactory) {
	            TomcatEmbeddedServletContainerFactory tomcat = (TomcatEmbeddedServletContainerFactory) container;
	            tomcat.addConnectorCustomizers(
	                (connector) -> {
	                    connector.setMaxPostSize(50000000); // 10 MB
	                }
	            );
	        }
	    };
	}*/
}
