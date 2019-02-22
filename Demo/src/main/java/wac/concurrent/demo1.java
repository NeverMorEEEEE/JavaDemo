package wac.concurrent;

import java.io.File;
import java.util.HashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.Lock;

public class demo1 {


    public void test() {
        final Lock lock = new MyTestLock();

        class Worker extends Thread {
            public void run() {
                while (true) {
                    lock.lock();

                    try {
                        Thread.sleep(1000L);
                        System.out.println(Thread.currentThread());
                        Thread.sleep(1000L);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    } finally {
                        lock.unlock();
                    }
                }
            }
        }

        for (int i = 0; i < 10; i++) {
            Worker w = new Worker();
            w.start();
        }

        new Thread() {
            public void run() {
                while (true) {

                    try {
                        Thread.sleep(200L);
                        System.out.println("44");
                    } catch (Exception ex) {

                    }
                }
            }
        }.start();

        try {
            Thread.sleep(20000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    public static void main(String[] args) {

		 new demo1().test();

    }

}
