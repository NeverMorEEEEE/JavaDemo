package wac.dp.singleTon;

import wac.basic.stack.stack;

/**
 * 推荐使用静态内部类实现单例，
 * @author Administrator
 * @date 2018年5月18日
 */
public class InnerSingleTon {
	
	{
		System.out.println("InnerSingleTon's normal_1 block!");
	}
	
	static{
		System.out.println("InnerSingleTon's static block!");
	}
	
	{
		System.out.println("InnerSingleTon's normal_2 block!");
	}
	
	private InnerSingleTon() {
		
		if(Inner.instance!=null){
			try {
				throw new IllegalAccessException("单例已被实例化，禁止非法反射构造函数");
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
    }
			
	static class Inner{
		{
			System.out.println("Inner's normal_2 block!");
		}
		
		
		static{
			System.out.println("Inner's static block!");
			
		}
		
		{
			System.out.println("Inner's normal_2 block!");
		}
		
		private static InnerSingleTon instance = new InnerSingleTon();
	}

	public static InnerSingleTon getInstances(){
		return Inner.instance;
	}

}
