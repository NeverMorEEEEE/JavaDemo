package wac.dp.CreationalPatterns.factoryMethod.model;

public class BMWCarFactory implements CarFactory {

    @Override
    public Icar createCar() {
        return new BMWCar();
    }

}
