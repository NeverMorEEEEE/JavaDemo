package wac.dp.CreationalPatterns.factoryMethod.model;

public class QQCarFactory implements CarFactory {

    @Override
    public Icar createCar() {
        return new QQCar();
    }

}
