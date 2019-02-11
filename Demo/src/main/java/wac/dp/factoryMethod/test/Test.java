package wac.dp.factoryMethod.test;

import wac.dp.factoryMethod.model.BMWCarFactory;
import wac.dp.factoryMethod.model.BenzCarFactory;
import wac.dp.factoryMethod.model.CarFactory;
import wac.dp.factoryMethod.model.Icar;
import wac.dp.factoryMethod.model.QQCarFactory;


public class Test {
    public static void main(String[] args) {
        CarFactory f = new QQCarFactory();
        Icar qq = f.createCar();

        CarFactory f1 = new BMWCarFactory();
        Icar bmw = f1.createCar();

        CarFactory f2 = new BenzCarFactory();
        Icar benz = f2.createCar();

        System.out.println(qq.getClass());
        System.out.println(bmw.getClass());
        System.out.println(benz.getClass());

    }
}
