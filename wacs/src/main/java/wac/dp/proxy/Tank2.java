package wac.dp.proxy;

public class Tank2 extends Tank{
/**
 * 通过继承来为原来的父类的方法加上一些语句
 */
	@Override
	public void move() {
		Long start = System.currentTimeMillis();
		System.out.println("Move 开始:");
		super.move();
		System.out.println("Move 结束,用时 " + (System.currentTimeMillis() - start));
	}
	
}
