package wac.dp.factoryMethod.model;
/*
 * 工厂设计模式---》工厂方法
 * 提供一个创建一个对象的接口，由子类决定到底要实例化哪一个类，使一个类的实例化延迟到子类
 * */
public interface CarFactory {
	public Icar createCar();
}
