package com.modules.order.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.modules.order.entity.Courier;
import com.modules.order.entity.Dispatch;
import com.modules.order.mapper.DispatchMapper;
import com.modules.order.service.CurierService;
import com.modules.order.service.DispatchService;

@Service
@Transactional
public class DispatchServiceImpl implements DispatchService{
	
	@Autowired
	DispatchMapper dispatchMapper;
	
	@Autowired
	CurierService curierService;

	/**
	 * 获取订单信息，分配给配送员
	 */
	@Override
	public Dispatch dispatch(String orderId) {
		//获取一个可用的派送员
		Courier courier = curierService.getOneFreeCurier();
		Dispatch dispatch = new Dispatch();
		dispatch.setOrderId(orderId);
		dispatch.setCourier(courier);
		
		System.out.println("创建订单-派送记录 :" + dispatch);
		dispatchMapper.save(dispatch);
		curierService.setOrderToCurier(courier.getCourierId(), dispatch.getDispatchId());
		return dispatch;
		
	}

}
