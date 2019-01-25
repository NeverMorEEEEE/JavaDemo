package com.modules.home.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import com.modules.home.domain.User;

@Mapper
public interface UserMapper{  
	@Select("select * from user where name=#{name}")
    public User findByName(String name);  
      
	@Insert("insert into user values(#{id},#{name},#{password},#{salt})")
    public boolean save(User user);  
    
	@Select("select * from user where id=#{id}")
    public User findOne(Long id);
  
} 