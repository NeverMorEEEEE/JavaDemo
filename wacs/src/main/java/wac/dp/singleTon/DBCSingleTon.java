package wac.dp.singleTon;

public class DBCSingleTon {
	
	private DBCSingleTon(){

	}

	private static DBCSingleTon instance = null;

	public static DBCSingleTon getInstances(){
		if(instance==null){
			try{
				Thread.sleep(30);
			}catch(Exception e){
				e.printStackTrace();
			}
			
			synchronized (DBCSingleTon.class) {
				if(instance==null){
					instance = new DBCSingleTon();
				}
			}
		}
		return instance;
	}

}
