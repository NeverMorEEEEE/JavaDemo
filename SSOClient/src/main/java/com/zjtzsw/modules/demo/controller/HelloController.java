package com.zjtzsw.modules.demo.controller;

import java.io.IOException;
import java.io.Reader;
import java.net.URLDecoder;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import oracle.sql.CLOB;

import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import seas.SeasInterface;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSONObject;
import com.opslab.util.StringUtils;
import com.zjtzsw.common.exception.WacException;
import com.zjtzsw.common.utils.R;
import com.zjtzsw.modules.demo.dao.DemoDao;
import com.zjtzsw.modules.demo.dao.MyMapper;
import com.zjtzsw.modules.demo.entity.DemoEntity;
import com.zjtzsw.modules.sys.domain.UserInfo;
import com.zjtzsw.modules.sys.entity.Aa10Entity;
import com.zjtzsw.modules.sys.result.CodeMsg;
import com.zjtzsw.modules.sys.service.LoginService;

@Controller
@RequestMapping("/demo")
public class HelloController {
    
    @Autowired
    RestTemplate restTemplate;
    
//    @Reference(version = "1.0.0")
   /* @Autowired
    LoginService loginService;*/
    
    @Autowired  
    private DemoDao demo;
    
    
    @Autowired  
    private MyMapper myMapper;
    
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
        return "/modules/demo/hello";  
          
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
    
//    @RequestMapping("/save")
//    @ResponseBody
//    public R save() {
//        return R.ok().setData(restTemplate.getForEntity("https://www.baidu.com", String.class).getBody());
//    }
    
    @RequestMapping("/query")
    @ResponseBody
    public Object query(DemoEntity demoe){

		return demo.query(demoe);
    }
    
    @RequestMapping("/delete")
    @ResponseBody
    public Object delete(String id){
    	JSONObject res = new JSONObject();
    	res.put("code", "00");
    	String result = "删除成功！";
    	try{
    		demo.delete(id);
    	}catch(Exception e){
    		e.printStackTrace();
    		res.put("code", "-1");
    		result = e.getMessage();
    	}
    	res.put("result", result);
    	
		return res;
    }
    
    @RequestMapping("/saveOrEdit")
    @ResponseBody
    public Object saveOrEdit(DemoEntity demoe){
    	JSONObject res = new JSONObject();
    	res.put("code", "00");
    	String result = "新增成功！";
    	
    	try{
    		if(demo.queryById(demoe.getId()) == null){
    			demo.save(demoe);
    			
    		}else{
    			demo.update(demoe);
    			result = "修改成功";
    		}
    		
    	}catch(Exception e){
    		e.printStackTrace();
    		res.put("code", "-1");
    		result = e.getMessage();
    	}
    	res.put("result", result);
    	
		return res;
    }
    
   /* 
    @RequestMapping("/dubboDemo")
    @ResponseBody
    public String dubboDemo(String account){
    	System.out.println("loginService : " + loginService);
    	if(StringUtils.isBlank(account)){
    		throw new WacException(CodeMsg.ACCOUNT_EMPTY);
    	}
    	System.out.println(" loginService : " + loginService);
    	UserInfo userInfo =  loginService.getUserByAccount(account);
    	
    	return JSONObject.toJSONString(userInfo);
    }*/
    
}
