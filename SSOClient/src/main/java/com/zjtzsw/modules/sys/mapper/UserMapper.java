package com.zjtzsw.modules.sys.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.zjtzsw.modules.sys.domain.UserInfo;
import com.zjtzsw.modules.sys.entity.Aa10Entity;

@Mapper
public interface UserMapper {
    
	@Select("select * from t_user where user_account = #{userAccount}")
    public UserInfo getUserByAccount(@Param("userAccount") String userAccount);

}
