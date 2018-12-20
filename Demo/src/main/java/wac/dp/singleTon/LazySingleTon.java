package wac.dp.singleTon;

/**
 * 非线程安全
 * @author Administrator
 * @date 2018年7月17日
 */
public class LazySingleTon {

	private LazySingleTon(){

	}

	private static LazySingleTon instance = null;

	public static LazySingleTon getInstances(){
		if(instance==null){
			instance = new LazySingleTon();
		}
		return instance;
	}

}
