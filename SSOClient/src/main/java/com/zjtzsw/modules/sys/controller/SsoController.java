package com.zjtzsw.modules.sys.controller;

import java.io.IOException;
import java.io.Reader;
import java.net.URLDecoder;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.opslab.helper.FileHelper;
import com.zjtzsw.common.utils.R;
import com.zjtzsw.modules.demo.dao.MyMapper;
import com.zjtzsw.modules.sys.service.UserService;
import com.zjtzsw.modules.sys.vo.LoginVo;

@Controller
@RequestMapping("/sso")
public class SsoController {

	private static Logger logger = Logger.getLogger(SsoController.class);

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	UserService userService;

	@Autowired
	private MyMapper myMapper;

	@RequestMapping("/index")
	public String index(HttpServletRequest hreq, HttpServletResponse hres,
			LoginVo loginVo) {

		return "/modules/home/LogonDialog";
	}

	@RequestMapping("/login")
	public void login(HttpServletRequest hreq, HttpServletResponse hres,
			LoginVo loginVo) {

		userService.login(hres, loginVo);

	}

	/**
	 *
	 * @param cookieName
	 *            cookie名称
	 * @param cookieValue
	 *            cookie值
	 * @param response
	 *            响应
	 */
	@RequestMapping("/addcookie")
	public void addCookies(String cookieName, String cookieValue,
			HttpServletResponse response) {
		logger.info("添加cookie");
		Cookie cookie = new Cookie(cookieName, cookieValue);
		cookie.setPath("/");
		cookie.setMaxAge(3600);
		cookie.setHttpOnly(true);
		response.addCookie(cookie);
	}

}
