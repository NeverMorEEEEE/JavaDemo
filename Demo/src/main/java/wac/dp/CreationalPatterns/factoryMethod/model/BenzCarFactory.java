package wac.dp.CreationalPatterns.factoryMethod.model;

public class BenzCarFactory implements CarFactory {

    @Override
    public Icar createCar() {
        return new BenzCar();
    }

}
