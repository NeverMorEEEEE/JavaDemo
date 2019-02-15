package com.zjtzsw.modules.sys.controller;

import io.swagger.annotations.ApiOperation;

import java.io.IOException;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import oracle.sql.CLOB;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.pagehelper.util.StringUtil;
import com.zjtzsw.common.utils.JedisUtil;
import com.zjtzsw.common.utils.R;
import com.zjtzsw.modules.demo.dao.MyMapper;
import com.zjtzsw.modules.sys.dao.UserDao;
import com.zjtzsw.modules.sys.domain.DAO.UserDO;
import com.zjtzsw.modules.sys.service.UserService;
import com.zjtzsw.modules.sys.util.CSUtil.CookieUtil;
import com.zjtzsw.modules.sys.util.CSUtil.SessionUtil;
import com.zjtzsw.modules.sys.util.JWT.JwtUtil;
import com.zjtzsw.modules.sys.vo.LoginVo;

@Controller
@RequestMapping("/sso")
public class SsoController {

	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	JedisUtil redisService;

	@Autowired
	UserService userService;
	
	@Autowired
	UserDao userDao;

	@Autowired
	private MyMapper myMapper;
	
	@RequestMapping("/register")
	public Object register(Model model) {


		return "sso/register";
	}
	
	@RequestMapping("/login")
	public Object login(Model model) {
		return "sso/login";
	}
	
	@ApiOperation(value="SSO单点登录校验入口，有全局会话的会带上token返回，没有的话会跳转到登录页面", notes="")
	@RequestMapping("/checkLogin")
	public String checkLogin(String redirectUrl, HttpSession session,
			Model model) {
		// 1.判断是否有全局的会话
		// 从会话中获取令牌信息,如果取不到说明没有全局会话,如果能取到说明有全局会话
		//这里也可以从缓存/Redis中去取Session或者token
		String token = (String) session.getAttribute("token");
		System.out.println("SESSION_TOKEN : " + token);
		if (StringUtils.isEmpty(token)) {
			// 表示没有全局会话
			model.addAttribute("redirectUrl", redirectUrl);
			// 跳转到统一认证中心的登陆页面.已经配置视图解析器,
			// 
			return "/sso/login";
		} else {
			/** ---------------------------阶段三添加的代码start-------------------- **/
			// 有全局会话
			// 取出令牌信息,重定向到redirectUrl,把令牌带上
			// http://www.wms.com:8089/main?token=
			model.addAttribute("token", token);
			
			/** ---------------------------阶段三添加的代码end----------------------- **/
			return "redirect:" + redirectUrl;
		}
	}
	
	@ApiOperation(value="SSO单点登录注册入口，检验所带token有效性后，保存下退出的url,供退出时调用", notes="")
	@RequestMapping("/checkToekn")
	public JSONObject checkToekn(String logoutUrl,String token) throws IllegalArgumentException, UnsupportedEncodingException {
		// 先校验token
		JSONObject json = new JSONObject();
		Map<String,Claim> map = JwtUtil.verifyToken(token,"secretkey");
	
		String account = "";
		String id;
		map.forEach((k,v)->{
			System.out.println(k + " : " + v);
			switch(k){
				case "account" : 
					v.
					break;
				case "id" : 
					id = v.toString();
					break;
			}
		});
		
		UserDO user = userDao.findOne(id);
		
		if(StringUtil.isNotEmpty(account)&&account.equals(user.getUserAccount())){
			// 根据ID查到用户的账号来和token里的ID来比对，一致认为token有效，注册客户端系统
			
			json.put("code", "01");
			json.put("msg", "校验注册成功！");
		
		}
		
		return json ;
	}


	@ApiOperation(value="用户登录方法，登录成功返回用户信息，登录失败返回错误原因")
	@ResponseBody
	@RequestMapping("/doLogin")
	public JSONObject doLogin(HttpServletRequest hreq, HttpServletResponse hres,
			LoginVo loginVo) {
		JSONObject res = userService.login(loginVo);
		System.out.println(res);
		// code=01 且 token不为空
		if("01".equals(res.getString("code"))&&wac.utils.StringUtils.isNotBlank(res.getString("token"))){
			//登录成功,原路返回,带上token
			CookieUtil.addCookie(hres, res);
			//session加上用户信息
			SessionUtil.addSession(hreq.getSession(), res);
		}
		return res;
	}

	@RequestMapping("/user")
	public void getUser(HttpServletRequest hreq, HttpServletResponse hres,
			LoginVo loginVo) {
		userService.login(hres, loginVo);
	}

}
