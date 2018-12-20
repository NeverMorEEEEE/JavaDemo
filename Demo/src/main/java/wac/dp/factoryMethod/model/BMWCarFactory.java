package wac.dp.factoryMethod.model;

public class BMWCarFactory implements CarFactory{

	@Override
	public Icar createCar() {
		return new BMWCar();
	}

}
