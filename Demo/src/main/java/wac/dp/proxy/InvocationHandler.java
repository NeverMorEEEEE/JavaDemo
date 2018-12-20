package wac.dp.proxy;

import java.lang.reflect.Method;

public interface InvocationHandler {

	void invoke(Object obj, Method m);
	

}
