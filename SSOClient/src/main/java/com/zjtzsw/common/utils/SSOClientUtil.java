package com.zjtzsw.common.utils;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class SSOClientUtil {
	
	private static Logger log = LoggerFactory.getLogger(SSOClientUtil.class);
	
    private static Properties ssoProperties = new Properties();
    public static String SERVER_URL_PREFIX;//统一认证中心地址:http://www.sso.com:8443,在sso.properties配置
    public static String SERVER_TOKEN_CHECK_URL;//认证中心的注册校验地址
    
    public static String CLIENT_HOST_URL;//当前客户端地址:http://www.crm.com:8088,在sso.properties配置
    public static String CLIENT_LOGOUT_URL;//客户端局部SESSION退出地址
    
    static{
        try {
            ssoProperties.load(SSOClientUtil.class.getClassLoader().getResourceAsStream("sso.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        CLIENT_HOST_URL = ssoProperties.getProperty("sso.client-host-url");
        log.info("当前客户端地址  CLIENT_HOST_URL: " + CLIENT_HOST_URL);
        CLIENT_LOGOUT_URL = ssoProperties.getProperty("sso.client-logout-url");
        log.info("客户端局部SESSION退出地址  CLIENT_LOGOUT_URL: " + CLIENT_LOGOUT_URL);
        
        SERVER_URL_PREFIX = ssoProperties.getProperty("sso.server-url-prefix");
        log.info("统一认证中心地址  SERVER_URL_PREFIX: " + SERVER_URL_PREFIX);
        SERVER_TOKEN_CHECK_URL = ssoProperties.getProperty("sso.server_token_check_url");
        log.info("认证中心的注册校验地址  SERVER_TOKEN_CHECK_URL: " + SERVER_TOKEN_CHECK_URL);
    }
    /**
     * 当客户端请求被拦截,跳往统一认证中心,需要带redirectUrl的参数,统一认证中心登录后回调的地址
     * 通过Request获取这次请求的地址 http://www.crm.com:8088/main
     * 
     * @param request
     * @return
     */
    public static String getRedirectUrl(HttpServletRequest request){
        //获取请求URL
        return CLIENT_HOST_URL+request.getServletPath();
    }
    /**
     * 根据request获取跳转到统一认证中心的地址 http://www.sso.com:8443//checkLogin?redirectUrl=http://www.crm.com:8088/main
     * 通过Response跳转到指定的地址
     * @param request
     * @param response
     * @throws IOException
     */
    public static void redirectToSSOURL(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String redirectUrl = getRedirectUrl(request);
        StringBuilder url = new StringBuilder(50)
                .append(SERVER_URL_PREFIX)
                .append("/checkLogin?redirectUrl=")
                .append(redirectUrl);
        
        System.out.println("redirectToSSOURL : " + url);
        response.sendRedirect(url.toString());
    }
    
    /**
     * 获取到SSO去检验token的地址，并注册到SSO
     * @param request
     * @param token
     * @return
     * @throws IOException
     */
    public static String getSSOTokenCheckUrl(HttpServletRequest request,String token) throws IOException {
  
        StringBuilder url = new StringBuilder(50)
                .append(SERVER_URL_PREFIX)
                .append("/checkToken?logoutUrl=")
                .append(CLIENT_LOGOUT_URL);
        
        System.out.println("getSSOTokenCheckUrl : " + url);
        return url.toString();
    }
 
 
    /**
     * 获取客户端的完整登出地址 http://www.crm.com:8088/logOut
     * @return
     */
    public static String getClientLogOutUrl(){
        return CLIENT_HOST_URL+"/logOut";
    }
    /**
     * 获取认证中心的登出地址 http://www.sso.com:8443/logOut
     * @return
     */
    public static String getServerLogOutUrl(){
        return SERVER_URL_PREFIX+"/logOut";
    }
}