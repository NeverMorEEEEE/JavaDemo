package wac.dp.abstractFactory.model;

public class QQCarFactory implements CarFactory {

    @Override
    public Wheel setWheel() {
        return new ChaoyangWheel();
    }

    @Override
    public Engine setEngine() {
        return new HondaEngine();
    }

    @Override
    public Chair setChair() {
        return new ClothChair();
    }

}
