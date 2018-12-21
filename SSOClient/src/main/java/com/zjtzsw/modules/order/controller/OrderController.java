package com.zjtzsw.modules.order.controller;

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
@RequestMapping("/order")
public class OrderController {
    
    @Autowired
    RestTemplate restTemplate;
    
    @RequestMapping("/query")
    @ResponseBody
    public Object query(){

		return "order undo!";
    }
    
    @RequestMapping("/delete")
    @ResponseBody
    public Object delete(String id){
    	JSONObject res = new JSONObject();
    	res.put("code", "00");
    	String result = "删除成功！";
    	try{
//    		demo.delete(id);
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
