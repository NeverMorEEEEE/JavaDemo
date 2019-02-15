package com.zjtzsw.modules.sys.util.CSUtil;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.util.StringUtil;

import com.alibaba.fastjson.JSONObject;


public class CookieUtil {
	
	private static String SSO_DOAMIN = "sso.com";
	
	/**
	 * 把map里的值全部当做token放入COOKIE中
	 * @param hres
	 * @param map
	 */
	public static void addCookie(HttpServletResponse hres,Map<String,Object> map){
		map.forEach((k,v)->{
			//创建COOKIE
	    	Cookie cookie;
			try {
				cookie = new Cookie(k, URLEncoder.encode(v.toString(), "UTF-8"));
				cookie.setDomain(SSO_DOAMIN);
		    	cookie.setMaxAge(30*60*60);
		    	cookie.setPath("/");
		    	//添加到客户端
		    	hres.addCookie(cookie);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	
		});
    }
	
	/**
	 * 把map里的值全部当做token放入COOKIE中
	 * @param hres
	 * @param map
	 */
	public static void addCookie(HttpServletResponse hres,JSONObject json){
		json.forEach((k,v)->{
			//创建COOKIE
	    	Cookie cookie;
			try {
				cookie = new Cookie(k, URLEncoder.encode(v.toString(), "UTF-8"));
				cookie.setDomain(SSO_DOAMIN);
		    	cookie.setMaxAge(30*60*60);
		    	cookie.setPath("/");
		    	//添加到客户端
		    	hres.addCookie(cookie);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
    }
	
	
	public static void addCookie(HttpServletResponse hres,String k,String v){
    	//存储到Redis
//    	String result = jedisUtil.set(token, userinfo, 3600);
//    	if("!1".equals(result)){
//    		throw new WacException("保存session到redis失败！", -11);
//    	}
//    	System.out.println("session保存到Redis成功！SessionID : " + token);
    	//创建COOKIE
		Cookie cookie;
		try {
			cookie = new Cookie(k, URLEncoder.encode(v.toString(), "UTF-8"));
			cookie.setDomain(SSO_DOAMIN);
	    	cookie.setMaxAge(30*60*60);
	    	cookie.setPath("/");
	    	//添加到客户端
	    	hres.addCookie(cookie);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    
    }
	
	public static void addCookie(HttpServletResponse hres,String k,Object v){
    	//存储到Redis
//    	String result = jedisUtil.set(token, userinfo, 3600);
//    	if("!1".equals(result)){
//    		throw new WacException("保存session到redis失败！", -11);
//    	}
//    	System.out.println("session保存到Redis成功！SessionID : " + token);
    	//创建COOKIE
		Cookie cookie;
		try {
			cookie = new Cookie(k, URLEncoder.encode(v.toString(), "UTF-8"));
			cookie.setDomain(SSO_DOAMIN);
	    	cookie.setMaxAge(30*60*60);
	    	cookie.setPath("/");
	    	//添加到客户端
	    	hres.addCookie(cookie);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    
    }

	public static void addCookie(HttpServletResponse hres,String k,String v,int expiry){
    	//存储到Redis
//    	String result = jedisUtil.set(token, userinfo, 3600);
//    	if("!1".equals(result)){
//    		throw new WacException("保存session到redis失败！", -11);
//    	}
//    	System.out.println("session保存到Redis成功！SessionID : " + token);
    	//创建COOKIE
		Cookie cookie;
		try {
			cookie = new Cookie(k, URLEncoder.encode(v.toString(), "UTF-8"));
			cookie.setDomain(SSO_DOAMIN);
	    	cookie.setMaxAge(30*60*60);
	    	cookie.setPath("/");
	    	cookie.setMaxAge(expiry);
	    	//添加到客户端
	    	hres.addCookie(cookie);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    
    }
	
	public static String getCookie(HttpServletRequest hreq,String key) throws UnsupportedEncodingException{
		if(StringUtil.isBlank(key)){
			throw new IllegalArgumentException("传入key为空");
		}
		Cookie[] cookies = hreq.getCookies();
		for(int i=0;i<cookies.length;i++){
			if(key.equals(cookies[i].getName())){
				return URLDecoder.decode(cookies[i].getValue(),"UTF-8");
			}
		}
		return null; 
	}
}
