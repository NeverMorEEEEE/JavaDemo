package com.zjtzsw.modules.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zjtzsw.modules.demo.dao.wacDao;
import com.zjtzsw.modules.demo.entity.WacEntity;
import com.zjtzsw.modules.demo.service.DemoService;
import com.zjtzsw.modules.demo.service.WacService;

@Service
public class WacServiceImpl implements WacService{

	   @Autowired  
	    private wacDao wacDao;

	@Override
	public  List<WacEntity> query(WacEntity demo) {
		return wacDao.query(demo);
	}

	@Override
	public WacEntity queryById(String id) {
		// TODO Auto-generated method stub
		return wacDao.queryById(id);
	}

	@Override
	public int delete(String id) {
		// TODO Auto-generated method stub
		return wacDao.delete(id);
	}

	@Override
	public int update(WacEntity demo) {
		// TODO Auto-generated method stub
		return wacDao.update(demo);
	}

	@Override
	public int save(WacEntity demo) {
		// TODO Auto-generated method stub
		return wacDao.save(demo);
	}
	    
}
