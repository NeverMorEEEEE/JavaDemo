package wac.dp.proxy.test;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import wac.dp.proxy.InvocationHandler;

public class TransactionHandler implements InvocationHandler{

	public Object target;
	
	
	
	
	public TransactionHandler(Object target) {
		super();
		this.target = target;
	}




	@Override
	public void invoke(Object obj, Method m) {
		System.out.println("Before TransactionHandler");
		try {
			m.invoke(target, null);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("After TransactionHandler");
	}

}
