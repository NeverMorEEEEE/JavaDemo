package com.zjtzsw.modules.sys.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.zjtzsw.common.constant.Constant;
import com.zjtzsw.common.exception.TZException;
import com.zjtzsw.common.exception.WacException;
import com.zjtzsw.common.utils.JedisUtil;
import com.zjtzsw.common.utils.MD5Utils;
import com.zjtzsw.common.utils.UUIDUtil;
import com.zjtzsw.modules.sys.domain.UserInfo;
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
    JedisUtil jedisUtil;
    
    /**
     * 用户登录校验方法,登录成功返回JWT token,登录失败返回NULL
     */
    public String login(HttpServletResponse hres,LoginVo loginVo){
    	System.out.println(loginVo);
    	UserInfo userInfo = userMapper.getUserByAccount(loginVo.getAccount());
    	if(userInfo==null){
//    		throw new WacException(CodeMsg.ACCOUNT_ERROR);
    		
    		System.out.println(CodeMsg.ACCOUNT_ERROR.getMsg());
    		return null;
    	}
    	//获取数据库用户信息
    	String pass = userInfo.getUserPass();
    	String salt = userInfo.getSalt();
    	
    	//用户登录表单密码,和数据库取出来的salt一起加密，再和数据库里的密码比对，一致即认为OK
    	String loginPass = loginVo.getPassword();
    	String handledPass = MD5Utils.convertInputPass2DbPass(loginPass,salt);
    	
    	System.out.println(handledPass);
    	if(!pass.equals(handledPass)){
//    		throw new WacException(CodeMsg.PASSWORD_ERROR);
    		System.out.println(CodeMsg.PASSWORD_ERROR.getMsg());
    		return null;
    	}
    	System.out.println("登录成功！");
    	Algorithm al;
    	String token = "";
		try {
			al = Algorithm.HMAC256("secretkey");
			JWT.create().withIssuer(userInfo.getUserAccount())
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

    	return token; 	
    }
    
    
}
