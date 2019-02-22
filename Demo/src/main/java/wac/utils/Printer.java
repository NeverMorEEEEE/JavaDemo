package wac.utils;

import com.alibaba.druid.pool.vendor.NullExceptionSorter;

/** 
* @author 作者 Your-Name: 
* @version 创建时间：2019年2月20日 下午4:23:46 
* 类说明 
*/
public class Printer {

	public static void print(Object obj) {
		if(obj==null) {
			throw new NullPointerException();
		}else {
		
			System.out.println(obj.toString());
		}
	}
	
	public static void printb(Object obj) {
			System.out.println(obj==null?"":obj.toString());
	}
}
