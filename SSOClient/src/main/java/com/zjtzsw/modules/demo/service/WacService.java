package com.zjtzsw.modules.demo.service;

import java.util.List;

import com.zjtzsw.modules.demo.entity.WacEntity;

public interface WacService {

	abstract List<WacEntity> query(WacEntity demo);
	   
	   WacEntity queryById(String id);
	   
	   abstract int delete(String id);
	   
	   abstract int update(WacEntity demo);

	   int save(WacEntity demo);
	   
	
}
