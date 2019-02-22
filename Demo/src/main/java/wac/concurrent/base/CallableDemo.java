package wac.concurrent.base;

import java.util.concurrent.Callable;

/** 
* @author 作者 Your-Name: 
* @version 创建时间：2019年2月20日 下午2:53:42 
* 类说明 
*/
public class CallableDemo implements Callable<String>{

	@Override
	public String call() throws Exception {
		
		for(int i = 0;i<1000;i++) {
			
		}
		
		return null;
	}
	
	
	
	
	public static void main(String[] args) {
		
	}


}
