package wac.dp.CreationalPatterns.abstractFactory.test;

import wac.dp.CreationalPatterns.abstractFactory.model.BMWCarFactory;
import wac.dp.CreationalPatterns.abstractFactory.model.CarFactory;


public class Test {
    public static void main(String[] args) {
        CarFactory car = new BMWCarFactory();
        System.out.println(car.setWheel().getClass());
        System.out.println(car.setEngine().getClass());
        System.out.println(car.setWheel().getClass());
    }
}
