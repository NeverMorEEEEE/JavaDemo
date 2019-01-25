package com.modules.elasticSearchDemo;

public class RSDemo {
	
	// 坐标
	private double myLon = 120.177036;//东经
	private double myLat= 30.293226; //北纬
	private String name = "帅哥wac";
	
	public void inidData() {
		int total = 100000;
		
		try {
			//建库建表
//			service.recreateIndex();
			//随机产生数据
//			service.AddDataToIndex();
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		System.out.println("初始化"  + total  + "条数据成功！");
	}


}
