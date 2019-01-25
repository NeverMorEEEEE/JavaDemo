package com.modules.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class Demo1Controller {

	
    @Autowired
    private RestTemplate restTemplate;

    //测试
    @RequestMapping(value = "/demo1")
    public String login(){
    	String result = restTemplate.getForObject("http://demoProvider/eurekaDemo?name=cyf", String.class);
    	return result;
    }
}
