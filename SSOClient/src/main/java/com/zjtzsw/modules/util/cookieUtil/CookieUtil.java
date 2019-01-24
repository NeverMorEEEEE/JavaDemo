package com.zjtzsw.modules.util.cookieUtil;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;


public class CookieUtil {
	
	public static void addCookie(HttpServletResponse hres,String key,String value){
    	//存储到Redis
//    	String result = jedisUtil.set(token, userinfo, 3600);
//    	if("!1".equals(result)){
//    		throw new WacException("保存session到redis失败！", -11);
//    	}
//    	System.out.println("session保存到Redis成功！SessionID : " + token);
    	//创建COOKIE
    	Cookie cookie = new Cookie(key, value);
//    	cookie.setMaxAge(600);
    	cookie.setPath("/");
    	//添加到客户端
    	hres.addCookie(cookie);
    
    }

	public static void addCookie(HttpServletResponse hres,String key,String value,int expiry){
    	//存储到Redis
//    	String result = jedisUtil.set(token, userinfo, 3600);
//    	if("!1".equals(result)){
//    		throw new WacException("保存session到redis失败！", -11);
//    	}
//    	System.out.println("session保存到Redis成功！SessionID : " + token);
    	//创建COOKIE
    	Cookie cookie = new Cookie(key, value);
    	cookie.setMaxAge(expiry);
    	cookie.setPath("/");
    	//添加到客户端
    	hres.addCookie(cookie);
    
    }
}
