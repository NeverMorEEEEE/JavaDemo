package com.zjtzsw.modules.sys.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zjtzsw.modules.sys.domain.UserInfo;

public interface LoginService {
    
	public UserInfo getUserByAccount(String userAccount);
}
