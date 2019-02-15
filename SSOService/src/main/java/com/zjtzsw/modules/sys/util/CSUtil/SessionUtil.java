package com.zjtzsw.modules.sys.util.CSUtil;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.web.session.HttpServletSession;

import com.alibaba.fastjson.JSONObject;


public class SessionUtil {
	
	/**
	 * 给session加上属性
	 * @param session
	 * @param map
	 */
	public static void addSession(HttpSession session,Map<String,Object> map){
		map.forEach((k,v)->{
		
			session.setAttribute(k, v);
		});
    }
	
	
	/**
	 * 给session加上属性
	 * @param session
	 * @param json
	 */
	public static void addSession(HttpSession session,JSONObject json){
		json.forEach((k,v)->{
			
			session.setAttribute(k, v);
		});
    }
	
	

}
