package com.modules.home.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@EnableAutoConfiguration
public class LoginController {
	
	@RequestMapping("/login")
	public String index() {
		return "index";
	}
	
	@RequestMapping("/logout")
    @ResponseBody
    String home() {
        return "logout!";
    }
	
	
}
