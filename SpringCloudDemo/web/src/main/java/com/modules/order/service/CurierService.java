package com.modules.order.service;

import java.util.List;

import com.modules.order.entity.Courier;

public interface CurierService {
	
	public List<Courier> getAllFreeCurier();
	
	public Courier getOneFreeCurier();
	
	public boolean setOrderToCurier(String curierId,String dispatchId);

	List<Courier> getAllCurier();

}
