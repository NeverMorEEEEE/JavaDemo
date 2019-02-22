package wac.concurrent;

import java.util.LinkedList;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import wac.basic.stack.MyStack;



/**
 *  偏向锁 <<轻量级锁<<重量级锁
 * 
 *  偏向锁：只有一个线程进入临界区；
 *	轻量级锁：多个线程交替进入临界区；
 *	重量级锁：多个线程同时进入临界区。
 * 
 * @author Administrator
 * @version 创建时间：2019年2月20日 下午3:05:38
 */
public class TestThread implements Runnable {

    public  Obj obj;

    static int num = 0;

    public TestThread(Obj obj) {
        this.obj = obj;
    }


    @Override
    public void run() {
//		long i = 0;
//		while (obj.flag&&obj.size()>0) {
//			
//			try {
//				
//				System.out.println(Thread.currentThread().getName()+ "消费 : " + obj.pop() );
//				Thread.sleep(10);
//			} catch (InterruptedException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//
//		}

        obj.test();
//		System.out.println("Thread stop until :" + i);
    }

    public void stop() {
        obj.flag = false;
    }

    public static void main(String[] args) throws InterruptedException {

        CountDownLatch countDownLatch = new CountDownLatch(75);
        Obj obj = new Obj(10000);
//		开启30个线程进行累加操作
        for (int i = 0; i < 100; i++) {
            new Thread() {
                public void run() {
//	                    for(int j=0;j<10000;j++){
//	                        num++;//自加操作
//	                    }
                    for (int j = 0; j < 50; j++) {
                        System.out.println(Thread.currentThread().getName() + " get " + obj.pop());
                    }
                    countDownLatch.countDown();
                }
            }.start();
        }
        //等待计算线程执行完
        countDownLatch.await();
        System.out.println("num : " + obj.pop_count + ", Table's size : " + obj.size());
        System.out.println("Main end!");
    }

    static class Obj {
        public boolean flag = true;
        public volatile int pop_count = 0;
        //		List<String> list = new LinkedList<String>();
        MyStack table = new MyStack();

        public Obj(int n) {
            for (int i = 1; i <= n; i++) {
                table.push("ticket_" + i);
            }
        }

        public void stop() {
            flag = !flag;
        }

        public Object pop() {
            ++pop_count;
            return table.pop();
        }

        public int size() {
            return table.size();
        }

        private void test() {
            if (flag) {
                System.out.println("Running...");
            } else {
                System.out.println("shutdown...");
            }
        }
    }
}