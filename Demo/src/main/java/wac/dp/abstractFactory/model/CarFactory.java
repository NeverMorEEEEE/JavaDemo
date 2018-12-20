package wac.dp.abstractFactory.model;
/*
 * 工厂设计模式---》抽象工厂
 * 提供一个接口用来创建一系列相关对象，而无需指定他们具体的类。
 * 
 * */
public interface CarFactory {
	public Wheel setWheel();
	public Engine setEngine();
	public Chair setChair();
	
}
