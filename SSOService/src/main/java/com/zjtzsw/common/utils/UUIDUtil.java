package com.zjtzsw.common.utils;

import java.util.UUID;

public class UUIDUtil {
	
	public static String uuid(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

}
