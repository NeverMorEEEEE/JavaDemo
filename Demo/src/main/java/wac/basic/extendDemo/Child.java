package wac.basic.extendDemo;

import java.util.HashMap;
import java.util.Map;

public class Child extends Father{
//	Map<String,Object> params = new HashMap<String,Object>();
	
	public Child(){
//		this.params.put("car", "benz");
		this.params.put("name", "Wac'son");
		this.params.put("context", "Wac'son is handsome!");
	}
	
	
	
	protected Object getName() {
		return params.get("name");
	}
	
//	protected Object getCar() {
//		return params.get("car");
//	}
	
	protected Object getContext() {
		return params.get("context");
	}

	
	public static void main(String[] args) {
		Child c = new Child();
		System.out.println(c.getCar());
		System.out.println(c.getName());
		System.out.println(c.getContext());
	}
}
