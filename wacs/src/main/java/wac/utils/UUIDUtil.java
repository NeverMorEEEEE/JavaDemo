package wac.utils;

import java.util.UUID;

/** 
* @author 作者 Your-Name: 
* @version 创建时间：2019年2月14日 上午12:32:24 
* 类说明 
*/
public class UUIDUtil {
	
	public static String RandomUUID(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	
	public static String fromString(String str){
		return UUID.fromString(str).toString().replaceAll("-", "");
	}
	
	public static void main(String[] args) {
		System.out.println(UUIDUtil.fromString("wacss"));
	}

}
