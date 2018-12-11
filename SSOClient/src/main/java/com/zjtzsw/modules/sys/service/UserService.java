package com.zjtzsw.modules.sys.service;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.ibatis.annotations.Param;

import com.zjtzsw.modules.sys.domain.UserInfo;
import com.zjtzsw.modules.sys.entity.Aa10Entity;
import com.zjtzsw.modules.sys.vo.LoginVo;

public interface UserService {
	
	public boolean login(HttpServletResponse hres,LoginVo loginVo);
	
	
	
}
