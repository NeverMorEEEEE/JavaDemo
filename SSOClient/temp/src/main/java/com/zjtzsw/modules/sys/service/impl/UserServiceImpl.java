package com.zjtzsw.modules.sys.service.impl;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import oracle.net.aso.MD5;

import org.apache.http.HttpResponse;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zjtzsw.common.constant.Constant;
import com.zjtzsw.common.exception.TZException;
import com.zjtzsw.common.exception.WacException;
import com.zjtzsw.common.utils.MD5Utils;
import com.zjtzsw.common.utils.UUIDUtil;
import com.zjtzsw.config.RedisService;
import com.zjtzsw.modules.sys.mapper.UserMapper;
import com.zjtzsw.modules.sys.domain.UserInfo;
import com.zjtzsw.modules.sys.entity.Aa10Entity;
import com.zjtzsw.modules.sys.result.CodeMsg;
import com.zjtzsw.modules.sys.service.LoginService;
import com.zjtzsw.modules.sys.service.UserService;
import com.zjtzsw.modules.sys.vo.LoginVo;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {
    
	
	private static final String COOKIE_TOKEN_PREFIX = Constant.COOKIE_TOKEN_PREFIX;
	
    @Autowired
    UserMapper userMapper;
    
    @Autowired
    RedisService redisService;
    
    /**
     * 用户登录校验方法
     */
    public boolean login(HttpServletResponse hres,LoginVo loginVo){
    	System.out.println(loginVo);
    	UserInfo userInfo = userMapper.getUserByAccount(loginVo.getAccount());
    	if(userInfo==null){
    		throw new WacException(CodeMsg.ACCOUNT_ERROR);
    	}
    	//获取数据库用户信息
    	String pass = userInfo.getUserPass();
    	String salt = userInfo.getSalt();
    	
    	//用户登录表单密码
    	String loginPass = loginVo.getPassword();
    	String handledPass = MD5Utils.convertInputPass2DbPass(loginPass,salt);
    	System.out.println(handledPass);
    	if(!pass.equals(handledPass)){
    		throw new WacException(CodeMsg.PASSWORD_ERROR);
    	}
    	System.out.println("登录成功！");
    	//生成模拟session
    	String tooken = UUIDUtil.uuid();
    	addCookie(hres,tooken,userInfo);
    	
    	
    	
    	return true; 	
    }
    
    private void addCookie(HttpServletResponse hres,String token,UserInfo userinfo){
    	//存储到Redis
    	if(!redisService.set(token, userinfo, 3600L)){
    		throw new WacException("保存session到redis失败！", -11);
    	}
    	System.out.println("session保存到Redis成功！SessionID : " + token);
    	//创建COOKIE
    	Cookie cookie = new Cookie(COOKIE_TOKEN_PREFIX, token);
    	cookie.setMaxAge(3600);
    	cookie.setPath("/");
    	//添加到客户端
    	hres.addCookie(cookie);
    	
    }
}
