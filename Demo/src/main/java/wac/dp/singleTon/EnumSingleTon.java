package wac.dp.singleTon;

public enum EnumSingleTon {
	instance;
	
	private inner _instance ;
	
	public void test(){
		System.out.println("test function");
	}
	
	EnumSingleTon(){
		System.out.println("Call EnumSingleTon's Constractor");
		_instance = new inner();
	}
	
	public static class inner{
		
	}
	
	public inner getInstances(){
		return _instance;
	}

}
