package com.zjtzsw.modules.sys.controller;

import java.io.IOException;
import java.io.Reader;
import java.net.URLDecoder;
import java.security.Key;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import oracle.sql.CLOB;

import org.activiti.engine.impl.util.json.XML;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.ExpiringSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.zjtzsw.common.utils.R;
import com.zjtzsw.common.utils.UUIDUtil;
import com.zjtzsw.modules.demo.dao.MyMapper;
import com.zjtzsw.modules.sys.service.UserService;
import com.zjtzsw.modules.sys.util.JWT.JKSUtil;
import com.zjtzsw.modules.sys.util.JWT.JwtUtil;
import com.zjtzsw.modules.sys.util.cookieUtil.CookieUtil;
import com.zjtzsw.modules.sys.util.springSession.SpringSessionDao;
import com.zjtzsw.modules.sys.vo.LoginVo;

@Controller
@RequestMapping("/token")
public class TokenController {

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	UserService userService;

	@Autowired  
	private MyMapper myMapper;
	
	@RequestMapping("/index")
	public String index(HttpServletResponse hres,String callbackurl, HttpSession session, Model model) throws IOException{
		//1.判断是否有全局的会话
        //从会话中获取令牌信息,如果取不到说明没有全局会话,如果能取到说明有全局会话
        String token = (String) session.getAttribute("token");
        if(StringUtils.isEmpty(token)){
            //表示没有全局会话
            model.addAttribute("redirectUrl",callbackurl);
            //跳转到统一认证中心的登陆页面.已经配置视图解析器,
            // 会找/WEB-INF/views/login.jsp视图
            return "/modules/home/LogonDialog";
        }else{
            /**---------------------------阶段三添加的代码start--------------------**/
            //有全局会话
            //取出令牌信息,重定向到redirectUrl,把令牌带上  
            // http://www.wms.com:8089/main?token=
        	System.out.println("全局会话登录： token:" +token);
            model.addAttribute("token",token);
            System.out.println(callbackurl);
            if(callbackurl.lastIndexOf("?")>0){
            	hres.sendRedirect(callbackurl +"&token=" + token);
            }else{
            	hres.sendRedirect(callbackurl +"?token=" + token);
            }
            return null;
        }
	}

	@RequestMapping("/login")
	public void login(HttpServletRequest hreq,HttpServletResponse hres,LoginVo loginVo) throws Exception{
		
		//校验用户信息
		if(!userService.login(hres, loginVo)){
			return ;
		}
		
		String privateKey = JKSUtil.getPrivateStrByJks("wac");//这里是加密解密的key。
		Map<String, Object> map = new HashMap<String, Object>();
	    map.put("userName", loginVo.getAccount());
	    map.put("timestamp", new Date().getTime());

		String jwtToken = JwtUtil.createJWT(map, privateKey);
		
    	//生成模拟session
    	String token = UUIDUtil.uuid();
    	CookieUtil.addCookie(hres,"token",jwtToken);
		
	}
	
	@RequestMapping("/user")
	public void getUser(HttpServletRequest hreq,HttpServletResponse hres,LoginVo loginVo){
		userService.login(hres, loginVo);
	}
	
	
	 private void kickUser(String userName)
	  {
	    ExpiringSession session = SpringSessionDao.getInstance().getSessionByDefaultIndex(userName);
	    if (session != null)
	    {
	      System.out.println("������sessionID-------------->" + session.getId());
	      SpringSessionDao.getInstance().delSession(session.getId());
	    }
	  }


}
