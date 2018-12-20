package wac.dp.abstractFactory.test;

import wac.dp.abstractFactory.model.CarFactory;
import wac.dp.abstractFactory.model.BMWCarFactory;


public class Test {
	public static void main(String[] args) {
		CarFactory car = new BMWCarFactory();
		System.out.println(car.setWheel().getClass());
		System.out.println(car.setEngine().getClass());
		System.out.println(car.setWheel().getClass());
	}
}
