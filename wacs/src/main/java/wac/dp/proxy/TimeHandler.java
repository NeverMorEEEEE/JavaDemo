package wac.dp.proxy;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class TimeHandler implements InvocationHandler{

	Object target;
	
	public TimeHandler(){
		
	}
	
	public TimeHandler(Object target){
		this.target = target;
	}
	
	
	
	public Object getTarget() {
		return target;
	}

	public void setTarget(Object target) {
		this.target = target;
	}

	@Override
	public void invoke(Object obj,Method m) {
		Long start = System.currentTimeMillis();
		System.out.println("TimeHandler 开始:");
		System.out.println(obj.getClass().getName());
		try {
			m.invoke(target);
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
		System.out.println("TimeHandler 结束,用时" + (System.currentTimeMillis() - start));
	}
}
