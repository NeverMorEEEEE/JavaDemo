package wac.dp.proxy;

public class Client {

	public static void main(String[] args) {
		Tank t = new Tank();
		
		//用InvocationHandler的模式可以对任意的对象，任意接口，实现任意的代理
		TankTimeProxy proxy = (TankTimeProxy) new Proxy().newProxyInstance("TankTimeProxy", Movable.class,new TimeHandler(t));
	
		
		
		
		proxy.move();
	}
	
}
