package com.modules.order.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.modules.order.entity.Courier;
import com.modules.order.entity.Dispatch;
import com.modules.order.mapper.CourierMapper;
import com.modules.order.mapper.DispatchMapper;
import com.modules.order.service.CurierService;
import com.modules.order.service.DispatchService;
import com.common.Constants;

@Service
@Transactional
public class CurierServiceImpl implements CurierService{

	@Autowired
	CourierMapper courierMapper;
	


	@Override
	public boolean setOrderToCurier(String curierId, String dispatchId) {
		int count = courierMapper.updateCourierStatus(curierId, Constants.COURIER_STATUS_NOFREE);
		return count==1?true:false;
	}



	@Override
	public List<Courier> getAllFreeCurier() {
		return courierMapper.getAllFreeCourier();
		
	}

	@Override
	public List<Courier> getAllCurier() {
		return courierMapper.getAllCourier();
	}

	@Override
	public Courier getOneFreeCurier() {
		return courierMapper.getOneFreeCourier();
	}
	

}
