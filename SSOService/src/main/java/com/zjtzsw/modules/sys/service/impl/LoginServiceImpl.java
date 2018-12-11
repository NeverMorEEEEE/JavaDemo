package com.zjtzsw.modules.sys.service.impl;

import java.util.List;





import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.dubbo.config.annotation.Service;
import com.zjtzsw.common.exception.TZException;
import com.zjtzsw.common.exception.WacException;
import com.zjtzsw.modules.sys.mapper.UserMapper;
import com.zjtzsw.modules.sys.domain.UserInfo;
import com.zjtzsw.modules.sys.entity.Aa10Entity;
import com.zjtzsw.modules.sys.result.CodeMsg;
import com.zjtzsw.modules.sys.service.LoginService;

@Service(version="1.0.0")
public class LoginServiceImpl implements LoginService {
    
    @Autowired
    UserMapper userMapper;

    public UserInfo getUserByAccount(String userAccount){
    	UserInfo userInfo = userMapper.getUserByAccount(userAccount);
    	if(userInfo==null){
    		throw new WacException(CodeMsg.PASSWORD_ERROR);
    	}
    	return userInfo; 	
    }
    
}
