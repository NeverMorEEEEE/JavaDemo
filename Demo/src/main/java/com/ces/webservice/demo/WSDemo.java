package com.ces.webservice.demo;

import java.rmi.RemoteException;

import com.zjtzsw.modules.webservices.service.DemoServiceWsProxy;

public class WSDemo {

	public static void main(String[] args) throws RemoteException {
		DemoServiceWsProxy dwp = new DemoServiceWsProxy();
		String result = dwp.getBanjInfo("hehe");
		System.out.println(result);
	}
}
