package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

import com.netflix.loadbalancer.BestAvailableRule;
import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RoundRobinRule;

@ComponentScan(basePackages= {"com"})
@SpringBootApplication
@EnableDiscoveryClient
public class Demo1Application {
	
	@Bean //定义REST客户端，RestTemplate实例
    @LoadBalanced //开启负债均衡的能力
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
	/**自定义配置ribbon负载均衡算法
     * @return
     */
    @Bean
    public IRule myRule(){
        return new RoundRobinRule();//轮询
        //return new RetryRule();//重试
//        return new BestAvailableRule();
    }
	

	public static void main(String[] args) {
		SpringApplication.run(Demo1Application.class, args);
	}
}
