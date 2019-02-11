package wac.dp.factoryMethod.model;

public class QQCarFactory implements CarFactory {

    @Override
    public Icar createCar() {
        return new QQCar();
    }

}
