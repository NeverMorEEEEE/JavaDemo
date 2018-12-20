package wac.dp.proxy.test;

import wac.dp.proxy.InvocationHandler;
import wac.dp.proxy.Proxy;
import wac.dp.proxy.TimeHandler;

public class client {
	
	public static void main(String[] args) {
		UserMgr umi = new UserMgrImpl();
		InvocationHandler h = new TransactionHandler(umi);
		String str = "wac.dp.proxy.test.UserMgr";
		
		InvocationHandler th = new TimeHandler(h);
		UserMgr u = (UserMgr) new Proxy().newProxyInstance("UserMgrProxy", UserMgr.class, th);
		
		u.addUser();
	
	}
	

}
