package wac.concurrent.base;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

/**
* @author 作者 Your-Name:
* @version 创建时间：2019年2月20日 下午2:53:42
* 类说明
*/
public class CallableDemo{

	public static void main(String[] args) {
		ThreadDemo td = new ThreadDemo();

		//1.执行 Callable 方式，需要 FutureTask 实现类的支持，用于接收运算结果。
		FutureTask<Integer> result = new FutureTask<>(td);

		new Thread(result).start();

		//2.接收线程运算后的结果
		try {
			Integer sum = result.get();  //FutureTask 可用于 闭锁 类似于CountDownLatch的作用， 自旋等待执行完成
										// 在所有的线程没有执行完成之后这里是不会执行的
			System.out.println(sum);
			System.out.println("------------------------------------");
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("end");
	}

}

class ThreadDemo implements Callable<Integer> {

	@Override
	public Integer call() throws Exception {
		int sum = 0;

		for (int i = 0; i <= 100000; i++) {
			sum += i;
		}

		return sum;
	}

}
