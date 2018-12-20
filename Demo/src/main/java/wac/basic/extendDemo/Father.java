package wac.basic.extendDemo;

import java.util.HashMap;
import java.util.Map;

import wac.dp.factoryMethod.model.QQCar;

public class Father {
	protected Map<String,Object> params = new HashMap<String,Object>();
	
	public Father(){
		this.params.put("car", "Poscher");
		this.params.put("name", "Wac");
		this.params.put("context", "Wac is handsome!");
	}
	
	
	protected Object getName() {
		return params.get("name");
	}
	
	protected Object getCar() {
		return params.get("car");
	}
	
	protected Object getContext() {
		return params.get("context");
	}
	
	
}
