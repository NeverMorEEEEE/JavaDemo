package com.zjtzsw.common.filter;

import com.zjtzsw.common.utils.JedisUtil;
import com.zjtzsw.modules.sys.domain.UserInfo;

import java.io.IOException;
import java.io.PrintStream;
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
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

//@PropertySource({ "classpath:sso.properties" })
//@ConfigurationProperties(prefix = "sso")
public class SessionServerFilter implements Filter {
	private static final String COOKIE_TOKEN_PREFIX = "wacDemoId";
	private static String ssourl;
	private static String welcomeurl;
	private static List<Pattern> patterns;
	@Autowired
	Environment environment;
	@Autowired
	JedisUtil redisService;

	public void init(FilterConfig config) throws ServletException {
		System.out.println("SessionFilter Initing!");
		ssourl = config.getInitParameter("ssourl");
		welcomeurl = config.getInitParameter("welcomeurl");
	}
	
	/**
	 * 采用JWT,并保存登录过的网址到redis,方便退出的时候统一退出
	 * @param request
	 * @param response
	 * @param chain
	 * @throws IOException
	 * @throws ServletException
	 */
	private void JWTCheck(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest hreq = request;
		System.out.println(hreq.getRequestURI());
		System.out.println(hreq.getRequestURL());
		Set<String> param = hreq.getParameterMap().keySet();
	
		HttpSession hs = request.getSession();

		Enumeration<String> es = hs.getAttributeNames();
		while (es.hasMoreElements()) {
			String key = (String) es.nextElement();
			System.out.println("key : " + key + " , value : "
					+ hs.getAttribute(key));
		}
		Cookie[] cookies = hreq.getCookies();
		String contextPath = request.getContextPath();
		//先检验第一种情况,没有全局SESSION,也没有token
		if (null == cookies) {
			System.out.println("cookie全是空的=========");

			chain.doFilter(request, response);
			return;
		}
		for (Cookie cookie : cookies) {
			System.out.println("name:" + cookie.getName() + ",value:"
					+ cookie.getValue());
			if ("wacDemoId".equals(cookie.getName())) {
				String token = cookie.getValue();

				UserInfo user = getCachedUser(token);
				System.out.println(user);
				if (user == null) {
					chain.doFilter(request, response);
					return;
				}
				String url = hreq.getParameter("callbackurl");
				System.out.println("callbackurl : " + url);
				if ((url == null) || ("".equals(url))) {
					url = welcomeurl;
				}
				response.sendRedirect(url + "?token=" + token);
			}
		}
		chain.doFilter(request, response);
	}


	private void check(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest hreq = request;
		System.out.println(hreq.getRequestURI());
		System.out.println(hreq.getRequestURL());
		Set<String> param = hreq.getParameterMap().keySet();
		for (String key : param) {
			System.out.println("key : " + key + " , value : "
					+ hreq.getParameter(key));
		}
		HttpSession hs = request.getSession();

		Enumeration<String> es = hs.getAttributeNames();
		while (es.hasMoreElements()) {
			String key = (String) es.nextElement();
			System.out.println("key : " + key + " , value : "
					+ hs.getAttribute(key));
		}
		Cookie[] cookies = hreq.getCookies();
		String contextPath = request.getContextPath();
		if (null == cookies) {
			System.out.println("cookie����=========");

			chain.doFilter(request, response);
			return;
		}
		for (Cookie cookie : cookies) {
			System.out.println("name:" + cookie.getName() + ",value:"
					+ cookie.getValue());
			if ("wacDemoId".equals(cookie.getName())) {
				String token = cookie.getValue();

				UserInfo user = getCachedUser(token);
				System.out.println(user);
				if (user == null) {
					chain.doFilter(request, response);
					return;
				}
				String url = hreq.getParameter("callbackurl");
				System.out.println("callbackurl : " + url);
				if ((url == null) || ("".equals(url))) {
					url = welcomeurl;
				}
				response.sendRedirect(url + "?token=" + token);
			}
		}
		chain.doFilter(request, response);
	}

	private UserInfo getCachedUser(String token) {
		Object obj = redisService.get(token);
		System.out.println(obj);
		if (obj == null)
			return null;
		return (UserInfo) obj;
	}

	public void destroy() {
		
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		JWTCheck((HttpServletRequest) request, (HttpServletResponse) response,
				chain);
		System.out.println("ssourl : " + ssourl);
	}
}
