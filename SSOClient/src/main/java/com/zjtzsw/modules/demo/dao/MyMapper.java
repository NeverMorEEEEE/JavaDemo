package com.zjtzsw.modules.demo.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MyMapper {
	
//	@Select("#{}")
//	public List<Map> select(String sql);
	
	void insert(String sql);
	
	List<Map> select(String sql);  
}