package org.user.server.service.impl;

import org.user.server.service.UserService;

import com.alibaba.fastjson.JSONObject;


public class UserServiceImpl implements UserService{

	@Override
	public JSONObject addUser() {
		// TODO Auto-generated method stub
		JSONObject result = new JSONObject();
		result.put("code", "00");
		result.put("msg", "新增用户成功！");
		
		return result;
	}

}
