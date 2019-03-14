package wac.concurrent.utilDemo;

import org.junit.jupiter.api.MethodOrderer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import wac.utils.ChineseName;
import wac.utils.UUIDUtil;
import wac.utils.redis.JedisUtil;

import java.util.Random;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadDemo extends Thread {
    private static Logger logger = LoggerFactory.getLogger(ThreadDemo.class);
    static CountDownLatch latch = new CountDownLatch(1);
    static String killGoodsName = "redmi_note_3_stock";
    static String killGoodsCount = "redmi_note_3_stock_count";
    static String killGoodsSuccessList = "redmi_note_3_stock_killSuccessList";
    static int lockTimeout = 3;

    static {
        JedisUtil.init("127.0.0.1", 6379, "", 3000);
    }


    static void fun1() {
        System.out.println("test : begin");

        for (int i = 0; i < 10; i++) {
            Thread t = new Thread() {
                public void run() {
                    System.out.println(Thread.currentThread().getName() + " : begin");
                    try {
//            Thread.sleep(2000);
                        latch.await();//阻塞直到latch执行count,数字减到零为止
                        synchronized (ThreadDemo.class) {
                            System.out.println("ThreadDemo synchronized working! Thread's Name : " + Thread.currentThread().getName());
                            Thread.sleep(1000);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName() + " : end");
                }
            };
//            t.setDaemon(true);
            t.start();
            try {

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        latch.countDown();
        try {

            Thread.sleep(3000);
            System.out.println("安静一会：3S");
            ThreadDemo.class.wait(3000);
            Thread.sleep(2000);
            System.out.println("打算notify：3S");
            ThreadDemo.class.notifyAll();

        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        System.out.println("latch.countDown");
    }

    void redisLockDemo() {
        String name = ChineseName.getName();
        String userId = UUIDUtil.RandomUUID();
        Jedis jedis = null;
        try {
            Thread.sleep((new Random().nextLong()) * 1000);
            jedis = JedisUtil.getJedis();
            // 先尝试获取指定KEY,即锁
            int stock = Integer.parseInt(jedis.get(killGoodsCount));
            if (stock > 0) {//库存还有
                if (jedis.setnx(killGoodsName, Thread.currentThread().getId() + "") == 1) {//设置锁成功
                    jedis.expire(killGoodsName, lockTimeout);//设置锁的过期时间
                    jedis.decr(killGoodsCount);//商品数量减1
                    jedis.lpush(killGoodsSuccessList, name + userId);//将抢购成功的订单或者用户信息记录到list
                    System.out.println(name + userId + "抢购成功！");
                } else {//竞争锁失败
                    return;
                }
            } else {
                System.out.println(name + "-" + userId + " ，商品已抢购完！");
            }
//            return jedis.set(key.getBytes(), SerializableUtils.toByteArray(value));
        } catch (Exception e) {
            logger.error(e.getMessage());

        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }
    }


}


/**
 * 程序输出：
 * test : begin
 * test : end
 * Thread-0 ：begin
 * <p>
 * 运行结果中不会有Thread-0 ： end，是因为，守护线程开启之后，中间睡了2s，这个时候又没有锁，主线程直接就执行完了，
 * 一旦主线程结束，那么JVM中就只剩守护线程了，JVM直接就退出了，不管你守护线程有没有执行完。
 */