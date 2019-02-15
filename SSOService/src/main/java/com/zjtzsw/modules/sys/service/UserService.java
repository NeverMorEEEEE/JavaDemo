package com.zjtzsw.modules.sys.service;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;

import com.alibaba.fastjson.JSONObject;
import com.zjtzsw.modules.sys.domain.UserInfo;
import com.zjtzsw.modules.sys.domain.DAO.UserDO;
import com.zjtzsw.modules.sys.vo.LoginVo;

public interface UserService {
	
	public JSONObject login(LoginVo loginVo);
	
	public String createUser(LoginVo loginVo);
	
	public Page<UserDO> findAll(int page,int size);
}
