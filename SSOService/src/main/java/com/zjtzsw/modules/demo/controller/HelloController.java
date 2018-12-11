package com.zjtzsw.modules.demo.controller;

import java.io.IOException;
import java.io.Reader;
import java.net.URLDecoder;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import oracle.sql.CLOB;

import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.XML;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import seas.SeasInterface;

import com.alibaba.fastjson.JSONObject;
import com.opslab.util.http.HttpRequest;
import com.zjtzsw.common.constant.Constant;
import com.zjtzsw.common.utils.R;
import com.zjtzsw.common.utils.SpringContextUtils;
import com.zjtzsw.modules.demo.dao.MyMapper;
import com.zjtzsw.modules.sys.entity.Aa10Entity;

@Controller
@RequestMapping("/demo")
public class HelloController {
	private static final String COOKIE_TOKEN_PREFIX = Constant.COOKIE_TOKEN_PREFIX;
    
    @Autowired
    RestTemplate restTemplate;
    
    
    @Autowired  
    private MyMapper myMapper;
    
    @ResponseBody
    @RequestMapping("/testJsonP")
    public void testJsonP(HttpServletRequest hreq,HttpServletResponse hres) throws IOException {
    	Set<String> param = hreq.getParameterMap().keySet();
		for(String key:param){
			System.out.println("key : " + key + " , value : " + hreq.getParameter(key));
		}
		String callbackurl = hreq.getParameter("callbackurl");
    	JSONObject json = new JSONObject();
    	json.put("code", "001");
    	json.put("message", "This's test for JSONP!");
    	json.put("returnurl",callbackurl);
    	json.put("token", UUID.randomUUID().toString());
//    	String result = hreq.getParameter("callback") + "(" + json.toJSONString() + ");location.href='" + callbackurl +"';document.cookie='"+ COOKIE_TOKEN_PREFIX+ "=" + UUID.randomUUID().toString()+"';";
    	String result = hreq.getParameter("callback") + "(" + json.toJSONString() + ");";
        
    	System.out.println(result);
    //	hres.sendRedirect(callbackurl);
    	Cookie c = new Cookie("wac",UUID.randomUUID().toString());
    	hres.addCookie(c);
    	hres.setContentType("type=text/html;charset=UTF-8");
		hres.getWriter().write(result);
    }
    
    @RequestMapping("/hello")
    public String hello(String url) {
    	String path = "";
    	if("edit".equals(url)){
    		 path = "modules/fileSystem/fileServiceEdit";
    	}else if("view".equals(url)){
    		path = "modules/fileSystem/fileServiceView";
    	}else if("upload".equals(url)){
    		path = "modules/fileSystem/fileServiceUpload";
    	}else if("fileview".equals(url)){
    		path =  "modules/fileSystem/fileView";
    	}else if("fileupload".equals(url)){
    		path = "modules/fileSystem/fileUpload";
    	}
    	System.out.println("Path : " +  path );
		return path;

    }
    
    
    @RequestMapping(value="/fileview")  
    public String testF2F() {  
        return "index";  
          
    }
    
    @ResponseBody
    @RequestMapping("/testFormXml")
    public Object testFormXml(String bod001) throws IOException, SQLException {
    	Map od06 = myMapper.select("select * from od06 where bod001 = '" + bod001 + "'").get(0);
		String jsonstr = "";
		Object result = null;
		if(od06.size()!=0){
			Object bod602 =   od06.get("BOD602");
			Clob clob = null;
			if(bod602 instanceof com.alibaba.druid.proxy.jdbc.ClobProxyImpl){
			 com.alibaba.druid.proxy.jdbc.ClobProxyImpl impl = (com.alibaba.druid.proxy.jdbc.ClobProxyImpl)bod602;
	         clob = impl.getRawClob();
			}
			Reader inStream = clob.getCharacterStream();
			  char[] c = new char[(int) clob.length()];
			  inStream.read(c);
			  //data是读出并需要返回的数据，类型是String
			 String forminfo_raw = new String(c);
			  inStream.close();
			  
			  
			System.out.println(forminfo_raw);
			
			
			String forminfo = URLDecoder.decode(forminfo_raw);
			
			System.out.println(forminfo);
			org.activiti.engine.impl.util.json.JSONObject json = XML.toJSONObject( forminfo);
			
			org.activiti.engine.impl.util.json.JSONObject records = json.getJSONObject("RECORDS");
			JSONArray items = records.getJSONObject("FormInfo").getJSONArray("Item");
			
			for(int i = 0;i<items.length();i++){
				Object js = items.get(i);
				System.out.println(items.get(i));
				if(items.get(i) instanceof java.lang.String){
					if("".equals(js.toString())){
						items.remove(i);
					}
					js = JSONObject.parseObject(items.get(i).toString());
				}else if(items.get(i) instanceof org.activiti.engine.impl.util.json.JSONObject){
					
				}
		
				
			}
			result = items;
//			jsonstr = Xml2JsonUtil.xml2JSON(od06.getStr("bod602"));
		}
		
        return result;
    }
    
    @RequestMapping("/save")
    @ResponseBody
    public R save() {
        return R.ok().setData(restTemplate.getForEntity("https://www.baidu.com", String.class).getBody());
    }
    
    
    @RequestMapping("/demo")
    @ResponseBody
    public List<Aa10Entity> demo(){
    	SeasInterface seas = new SeasInterface("http://10.84.94.57:7001/seas");
    	
    	return null;
    }
    
    
    @RequestMapping("/trsdemo")
    @ResponseBody
    public List<Aa10Entity> trsdemo(){
    	
    	return null;
    }
    
    @RequestMapping("/jsonpDemo")
    @ResponseBody
    public Object JSONPDemo(){
    	JSONObject json = new JSONObject();
		json.put("token", "123");
		json.put("success", "true");
		json.put("isLogin", "true");
		json.put("callbackurl","http://www.acfun.cn");

			//把结果封装成一个js语句响应
		MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(json.toJSONString());
		mappingJacksonValue.setJsonpFunction("jsonpCallback");
		return mappingJacksonValue;
    }
    
    @RequestMapping("/dubboDemo")
    @ResponseBody
    public String getBeans(){
    	
    	String[] beanNames = SpringContextUtils.getBeanNames();
    	JSONObject result = new JSONObject();
    	System.out.println("size Of BeansContainer : " + beanNames.length);
    	for(String beanName : beanNames){
//    		Object bean =  SpringContext.getBean(beanName);
//    		System.out.println(beanName + " : " + bean);
//    		result.put(beanName, bean);
    		if(beanName.indexOf("login")>0){
    			System.out.println(beanName);
    		}
    		if(beanName.indexOf("service")>0){
    			System.out.println(beanName);
    		}
    		if(beanName.indexOf("Service")>0){
    			System.out.println(beanName);
    		}
    		if(beanName.indexOf("loginService")>0){
    			System.out.println(beanName);
    		}
    		if(beanName.indexOf("LoginService")>0){
    			System.out.println(beanName);
    		}
    		if(beanName.indexOf("LoginServiceImpl")>0){
    			System.out.println(beanName);
    		}
    		if(beanName.indexOf("loginServiceImpl")>0){
    			System.out.println(beanName);
    		}
    		
    	}

		return result.toJSONString();
    }
}
