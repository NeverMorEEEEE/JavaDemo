package com.modules.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class Demo3Controller {

	
    //退出的时候是get请求，主要是用于退出
    @RequestMapping(value = "/eurekaDemo")
    public String demo(String name){
    	 return "EurekaDemo Port : 8083 , 我要搞" + name;
    }
}
