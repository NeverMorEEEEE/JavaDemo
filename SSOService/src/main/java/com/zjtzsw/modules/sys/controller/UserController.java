package com.zjtzsw.modules.sys.controller;

import io.swagger.annotations.ApiOperation;

import java.io.IOException;
import java.io.Reader;
import java.net.URLDecoder;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.ws.soap.Addressing;

import oracle.sql.CLOB;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.zjtzsw.common.utils.JedisUtil;
import com.zjtzsw.common.utils.R;
import com.zjtzsw.modules.demo.dao.MyMapper;
import com.zjtzsw.modules.sys.dao.UserDao;
import com.zjtzsw.modules.sys.domain.DAO.UserDO;
import com.zjtzsw.modules.sys.service.UserService;
import com.zjtzsw.modules.sys.util.CSUtil.CookieUtil;
import com.zjtzsw.modules.sys.vo.LoginVo;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	JedisUtil redisService;

	@Autowired
	UserService userService;
	
	@Autowired
    private UserDao userDao;

	@Autowired
	private MyMapper myMapper;

	@ApiOperation(value="用户注册方法，注册成功返回用户信息")
	@ResponseBody
	@RequestMapping("/register")
	public JSONObject register(HttpServletRequest hreq,HttpServletResponse hres,LoginVo loginVo){
		JSONObject result = new JSONObject();
		String user = userService.createUser(loginVo);
		result.put("code", "01");
		result.put("user",JSONObject.toJSON(user));
		result.put("success", true);
		return result;
	}
	
	//删除
	@DeleteMapping("/{id}")
	public boolean delUser(@PathVariable("id") Long id) {
		try {
			userDao.delete(String.valueOf(id));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	// 按ID查找
	@GetMapping("/{id}")
	public UserDO findById(@PathVariable("id") Long id) {
		return userDao.findOne(String.valueOf(id));
	}
	
	
	// 全部查page
	@GetMapping("/findAll")
	public Page<UserDO> findAll(int page,int size) {
		return userService.findAll(page, size);
	}
	
	

}
