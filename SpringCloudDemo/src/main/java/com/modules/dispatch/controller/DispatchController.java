package com.modules.dispatch.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@EnableAutoConfiguration
public class DispatchController {
	
	@RequestMapping("/index")
	public String index(HttpServletRequest request,Model model) {
		model.addAttribute("port", request.getLocalPort());
		System.out.println(model);
		return "index";
	}
	
	@RequestMapping("/hello")
    @ResponseBody
    String home() {
        return "Hello World!";
    }
	
	
}
