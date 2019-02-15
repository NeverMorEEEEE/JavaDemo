package com.zjtzsw.modules.sys.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.ibatis.annotations.Param;
import org.hibernate.criterion.Example;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import wac.utils.UUIDUtil;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.zjtzsw.common.constant.Constant;
import com.zjtzsw.common.exception.TZException;
import com.zjtzsw.common.exception.WacException;
import com.zjtzsw.common.utils.JedisUtil;
import com.zjtzsw.common.utils.MD5Utils;
import com.zjtzsw.modules.sys.dao.UserDao;
import com.zjtzsw.modules.sys.domain.UserInfo;
import com.zjtzsw.modules.sys.domain.DAO.UserDO;
import com.zjtzsw.modules.sys.mapper.UserMapper;
import com.zjtzsw.modules.sys.result.CodeMsg;
import com.zjtzsw.modules.sys.service.LoginService;
import com.zjtzsw.modules.sys.service.UserService;
import com.zjtzsw.modules.sys.util.JWT.JwtUtil;
import com.zjtzsw.modules.sys.vo.LoginVo;


/**
 * SSO服务端，用户登录Service
 * @author wac
 * @date 2018年7月28日
 */
@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {
    
	
	private static final String COOKIE_TOKEN_PREFIX = Constant.COOKIE_TOKEN_PREFIX;
	
    @Autowired
    UserMapper userMapper;
    
	@Autowired
    private UserDao userDao;
    
    @Autowired
    JedisUtil jedisUtil;
    
    /**
     * 用户登录校验方法,登录成功返回JWT token,登录失败返回NULL
     */
    public JSONObject login(LoginVo loginVo){
    	System.out.println(loginVo);
    	
		JSONObject res = new JSONObject();
    	String token = "";
    	res.put("token", token);
    	UserDO userInfo = userDao.findOneByAccount(loginVo.getAccount());
    	
    	// 根据账号查找记录
    	if(userInfo==null){
    		res.put("code", "-2");
    		res.put("msg", "改用户名未注册");
    		System.out.println(CodeMsg.ACCOUNT_ERROR.getMsg());
    		return res;
    	}
    	//获取数据库用户信息
    	String pass = userInfo.getUserPass();
    	String salt = userInfo.getSalt();
    	
    	//用户登录表单密码,和数据库取出来的salt一起加密，再和数据库里的密码比对，一致即认为OK
    	String loginPass = loginVo.getPassword();
    	String handledPass = MD5Utils.convertInputPass2DbPass(loginPass,salt);
    	
    	System.out.println(handledPass);
    	if(!pass.equals(handledPass)){
    		//和用户特有salt一起加密后比对失败，密码错误
    		res.put("code", "-1");
    		res.put("msg", "输入密码有误");
    		System.out.println(CodeMsg.PASSWORD_ERROR.getMsg());
    		return res;
    	}
    	System.out.println("登录成功！");
    	Algorithm al;
		try {
			al = Algorithm.HMAC256("secretkey");
			token = JWT.create().withIssuer(userInfo.getUserAccount())
    		.withSubject("SSO")
    		.withClaim("name",userInfo.getUserAccount())
    		.withExpiresAt(new Date(System.currentTimeMillis()+36000))
    		.sign(al);
			
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("登录成功， user'res: " + res);
		res.put("code", "01");
		res.put("isLogin", true);
		res.put("msg", "登录成功");
		res.put("token", token);
		res.put("id", userInfo.getUserId());

    	return res; 	
    }

	private void findOneByUserName(String account) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String createUser(LoginVo loginVo) {
		
		String salt = UUIDUtil.RandomUUID();
		
		UserDO user = new UserDO();
		user.setUserName(loginVo.getName());
		user.setUserAccount(loginVo.getAccount());
		user.setSalt(salt);
		user.setUserPass(MD5Utils.convertInputPass2DbPass(loginVo.getPassword(),salt));
		
		System.out.println("要保存的UserDO : " +  user);
		
		user = userDao.save(user);
		
		System.out.println("执行结果 : " + user.toString());
		
		return user.toViewString();
	}
    
	public Page<UserDO> findAll(int page,int size) {
		size = size==0?10:size;
		Pageable pageable = new PageRequest(page, size);
		return userDao.findAll(pageable);
	}
    
	
	public static void main(String[] args) {
		String loginPass = "698d51a19d8a121ce581499d7b701668";
		
		String salt = "09fb9f8dc60e44cf813474dbd47a1b25";
		
		String handledPass = MD5Utils.convertInputPass2DbPass(loginPass,salt);
		
		System.out.println("handledPass : " + handledPass);
	}
}
