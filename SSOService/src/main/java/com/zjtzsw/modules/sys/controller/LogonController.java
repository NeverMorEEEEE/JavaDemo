package com.zjtzsw.modules.sys.controller;

import java.io.IOException;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import oracle.sql.CLOB;

import org.activiti.engine.impl.util.json.XML;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.tzsw.plat.commons.StringUtil;
import com.zjtzsw.common.utils.R;
import com.zjtzsw.modules.demo.dao.MyMapper;
import com.zjtzsw.modules.sys.service.UserService;
import com.zjtzsw.modules.sys.vo.LoginVo;

@Controller
@PropertySource(value = {"classpath:sso.properties"},encoding="utf-8")
@RequestMapping("/home")
public class LogonController {
	
	@Value("${sso.welcomeurl:http://localhost:8081/demo/fileview}")
    private String welcomeurl;
	
	@Value("${sso.domains:.qq.com;.baidu.com;}")
    private String domains;
	
	
	@Autowired
	RestTemplate restTemplate;

	@Autowired
	UserService userService;

	@Autowired  
	private MyMapper myMapper;
	
	@RequestMapping("/index")
	public String index(HttpServletRequest hreq,HttpServletResponse hres,LoginVo loginVo){

		return "/modules/home/LogonDialog";
	}
	
	@ResponseBody
	@RequestMapping("/login")
	public String login(HttpServletRequest hreq,HttpServletResponse hres,LoginVo loginVo,String callback,String callbackurl) throws IOException{
		String msg = "";
		String url = callbackurl;
		System.out.println("callback : " + callback);
		System.out.println("callbackurl : " + url);
		
		if(url==null||"".equals(url)){
			//没有callbackurl，则跳转配置好的欢迎页面
			System.out.println("没有回调URL,设置跳转默认成功页面");
			url = welcomeurl;
		}
		System.out.println("回调URL : " + url);
		
		if(userService.login(hres, loginVo)){//登录成功则跳转页面
			System.out.println("登录成功!");

			String token = loginVo.getToken();
			hreq.setAttribute("token", token);
			hreq.getSession().setAttribute("token", token);
//			hres.sendRedirect(url);
			JSONObject json = new JSONObject();
			json.put("token", token);
			json.put("success", "true");
			json.put("isLogin", "true");
			json.put("callbackurl",url);
			json.put("domains", domains);
			
			msg = json.toJSONString();
			addCronCookie(hres,url,token);
			
//			String result = callback +"("+ json.toJSONString() + ")";
//			if(com.opslab.util.StringUtils.isBlank(callback)){
//				//检查是不是JSONP请求，是就进行跨域请请求
//				result = json.toJSONString();
//			}
//			System.out.println("result : " + result);
//			hres.setContentType("text/html;charset=UTF-8");
//			hres.getWriter().write(result);
		}else{
			msg = "{'success':'false','msg':'登录账号或者密码有问题！'}";
		}
		if (StringUtils.isNotBlank(callback)) {
			//callback不为空，默认是JSONP跨域
//			addCronCookie(hres,url,token);
			//把结果封装成一个js语句响应
//			MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(json.toJSONString());
//			mappingJacksonValue.setJsonpFunction(callback);
			return callback + "(" + msg + ")" ;
		}else{
			return msg;
		}
		
		
	}
	/**
	 * 设置跨域Cookie
	 * @param hres
	 * @param callbackurl
	 * @param token
	 * @throws MalformedURLException 
	 */
	private void addCronCookie(HttpServletResponse hres,String callbackurl,String token) throws MalformedURLException{
		URL url = new URL(callbackurl);
		String host = url.getHost();
		Cookie cookie = new Cookie("token-1", token);
    	cookie.setMaxAge(3*60*60);
    	cookie.setPath("/");
    	hres.addCookie(cookie);
    	System.out.println("设置跨域cookie成功, Host : " + host + " , cookie : " + cookie);
	}


}
