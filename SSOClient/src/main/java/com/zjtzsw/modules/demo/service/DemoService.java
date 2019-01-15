package com.zjtzsw.modules.demo.service;

import java.util.List;

import com.zjtzsw.modules.demo.entity.DemoEntity;


public interface DemoService {

	abstract List<DemoEntity> query(DemoEntity demo);
	   
	   DemoEntity queryById(String id);
	   
	   abstract int delete(String id);
	   
	   abstract int update(DemoEntity demo);

	   int save(DemoEntity demo);
	   
	
}
