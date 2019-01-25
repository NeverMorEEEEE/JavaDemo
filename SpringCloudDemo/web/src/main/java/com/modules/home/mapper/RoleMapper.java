package com.modules.home.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.modules.home.domain.Role;
import com.modules.home.domain.User;

@Mapper
public interface RoleMapper{  
      
	@Insert("insert into role values(#{id},#{roleName})")
    public void save(Role role);  
  
} 