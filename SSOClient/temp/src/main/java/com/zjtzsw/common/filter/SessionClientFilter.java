package com.zjtzsw.common.filter;

import java.io.IOException;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import com.zjtzsw.common.constant.Constant;
import com.zjtzsw.common.utils.JedisUtil;
import com.zjtzsw.common.xss.XssHttpServletRequestWrapper;
import com.zjtzsw.config.RedisService;
import com.zjtzsw.modules.sys.domain.UserInfo;

/**
 * 检查用户的cookie,并校验有效性，无效则跳转SSOServiceURL
 * @author wac
 * @date 2018年7月23日
 */
@PropertySource(value = {"classpath:sso.properties"},encoding="utf-8")
@ConfigurationProperties(prefix = "sso")
public class SessionClientFilter implements Filter {
	private static final String COOKIE_TOKEN_PREFIX = Constant.COOKIE_TOKEN_PREFIX;

	private static String url ;
	private static List<Pattern>  patterns;

	@Autowired
	Environment environment;

	@Autowired
	JedisUtil redisService;


	@Override
	public void init(FilterConfig config) throws ServletException {
		System.out.println("SessionFilter Initing!");
		url = config.getInitParameter("ssourl");

		//		String[] patternStr = config.getInitParameter("passUrl").split(";");
		//		
		//		for(String str : patternStr){
		//			patterns.add(Pattern.compile(str));
		//		}
		//		
	}

	private void check(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpSession hs = request.getSession();
		Enumeration<String> es = hs.getAttributeNames();
		while(es.hasMoreElements()){
			String key = es.nextElement();
			System.out.println("key : " + key + " , value : " + hs.getAttribute(key));
		}

		String isLogin = (String) hs.getAttribute("isLogin");
		if(isLogin!=null&&!"".equals(isLogin)){
			//局部会话放行
			chain.doFilter(request, response);
			return;
		}
		System.out.println("局部session无效");
		String token = request.getParameter("token");
		System.out.println("Token : " +  token);

		if(token!=null&&!"".equals(token)){//连接是带token的

			UserInfo user = getCachedUser(token);
			System.out.println(user);
			if(user!=null){//token有效，则保存token,往下走
				//cookie有效,允许继续访问;
				Cookie c = new Cookie("isLogin","true");
				c.setMaxAge(3600);
				c.setPath("/");
				response.addCookie(c);
				request.getSession().setAttribute("token", token);
				request.getSession().setAttribute("isLogin", "true");
				Cookie c1 = new Cookie("account", user.getUserAccount());
				c1.setMaxAge(3600);
				c1.setPath("/");
				response.addCookie(c1);
				request.getRequestURL();
				String turl = getURLWithOutToken(request);
				response.sendRedirect(turl);
				return;
			}else{
				//token无效
				response.sendRedirect(url + "?callbackurl=" + request.getRequestURL());	
				return;
			}
		}else{
			//没有token
			response.sendRedirect(url + "?callbackurl=" + request.getRequestURL());	
			return;
		}
	}
	
	private void JSONPCheck(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpSession hs = request.getSession();
		Enumeration<String> es = hs.getAttributeNames();
		while(es.hasMoreElements()){
			String key = es.nextElement();
			System.out.println("key : " + key + " , value : " + hs.getAttribute(key));
		}

		String isLogin = (String) hs.getAttribute("isLogin");
		if(isLogin!=null&&!"".equals(isLogin)){
			//局部会话放行
			chain.doFilter(request, response);
			return;
		}
		System.out.println("局部session无效");
		request.getRequestDispatcher("/home/index").forward(request, response);
	}

	private String getURLWithOutToken(HttpServletRequest request){
		String uri = request.getRequestURI();
		StringBuffer url = request.getRequestURL();
		url.append("?");
		Map<String, String[]> param = request.getParameterMap();
		
		param.remove("token");
		
		Set<String> keys= param.keySet();
		
		for(String key : keys){
			System.out.println(request.getParameter(key));
			
			url.append("&"+key+ "=" + request.getParameter(key));
		}
		
		System.out.println("拼好得URL : " + url.toString());
		
		
		return url.toString();
		
		
		
	}
	
	private UserInfo getCachedUser(String token){
		Object obj =  redisService.get(token);
		System.out.println(obj);
		if(obj==null) return null;
		return (UserInfo)obj;
	}

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
//		check((HttpServletRequest)request,(HttpServletResponse)response,chain);
		JSONPCheck((HttpServletRequest)request,(HttpServletResponse)response,chain);
	}

	public static String getUrl() {
		return url;
	}

	public static void setUrl(String url) {
		System.out.println("设置SSOFilter_URL:" + url);
		SessionClientFilter.url = url;
	}
}