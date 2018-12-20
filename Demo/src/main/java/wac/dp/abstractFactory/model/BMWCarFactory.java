package wac.dp.abstractFactory.model;

public class BMWCarFactory implements CarFactory{

	@Override
	public Wheel setWheel() {
		return new MichileWheel();
	}

	@Override
	public Engine setEngine() {
		return new MitsubishiEngine();
	}

	@Override
	public Chair setChair() {
		return new LeatherChair();
	}

}
