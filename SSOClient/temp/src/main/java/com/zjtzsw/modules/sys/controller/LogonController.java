package com.zjtzsw.modules.sys.controller;

import java.io.IOException;
import java.io.Reader;
import java.net.URLDecoder;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import oracle.sql.CLOB;

import org.activiti.engine.impl.util.json.XML;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.zjtzsw.common.utils.R;
import com.zjtzsw.modules.demo.dao.MyMapper;
import com.zjtzsw.modules.sys.service.UserService;
import com.zjtzsw.modules.sys.vo.LoginVo;

@Controller
@PropertySource(value = {"classpath:sso.properties"},encoding="utf-8")
@RequestMapping("/home")
public class LogonController {
	
	@Value("${sso.loginUrl}")
	private  String ssoLoginUrl;
	
	@Value("${sso.passUrl}")
	private  String loginurl;


	@Autowired
	RestTemplate restTemplate;

	@Autowired
	UserService userService;

	@Autowired  
	private MyMapper myMapper;
	
	@RequestMapping("/index")
	public String index(HttpServletRequest hreq,HttpServletResponse hres,LoginVo loginVo,Model model){
		model.addAttribute("sso_login_url", ssoLoginUrl +"?callbackurl=" + hreq.getRequestURL());
		System.out.println("ssoLoginUrl : " + ssoLoginUrl);
		
		return "/modules/home/LogonDialog";
	}
	
	@RequestMapping("/hello")
	public String hello(HttpServletRequest hreq,HttpServletResponse hres,LoginVo loginVo,Model model){
		model.addAttribute("UserName", "Wac Hansome");
		model.addAttribute("title", "HeiHei");
		System.out.println(model);
		return "hello";
	}

	@RequestMapping("/login")
	public void login(HttpServletRequest hreq,HttpServletResponse hres,LoginVo loginVo){

		userService.login(hres, loginVo);

	}


}
