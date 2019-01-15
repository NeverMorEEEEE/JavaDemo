package com.zjtzsw.modules.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zjtzsw.modules.demo.dao.DemoDao;
import com.zjtzsw.modules.demo.entity.DemoEntity;
import com.zjtzsw.modules.demo.service.DemoService;

@Service
public class DemoServiceImpl implements DemoService{

	   @Autowired  
	    private DemoDao demoDao;

	@Override
	public  List<DemoEntity> query(DemoEntity demo) {
		return demoDao.query(demo);
	}

	@Override
	public DemoEntity queryById(String id) {
		// TODO Auto-generated method stub
		return demoDao.queryById(id);
	}

	@Override
	public int delete(String id) {
		// TODO Auto-generated method stub
		return demoDao.delete(id);
	}

	@Override
	public int update(DemoEntity demo) {
		// TODO Auto-generated method stub
		return demoDao.update(demo);
	}

	@Override
	public int save(DemoEntity demo) {
		// TODO Auto-generated method stub
		return demoDao.save(demo);
	}
	    
}
