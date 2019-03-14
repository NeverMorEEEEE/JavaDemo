package wac.concurrent.utilDemo;

import com.opslab.util.RandomUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Response;
import redis.clients.jedis.Transaction;
import wac.utils.ChineseName;
import wac.utils.UUIDUtil;
import wac.utils.redis.JedisUtil;

import java.util.List;
import java.util.Random;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 模拟消费者线程
 */
public class CunstomoThread implements Runnable {
    private static Logger logger = LoggerFactory.getLogger(ThreadDemo.class);
    static CountDownLatch latch = new CountDownLatch(1);
    static String killGoodsName = "redmi_note_3_stock";
    static String killGoodsCount = "redmi_note_3_stock_count";
    static String killGoodsSuccessList = "redmi_note_3_stock_killSuccessList";
    static int lockTimeout = 5;
    int id ;

    static {
        JedisUtil.init("127.0.0.1", 6379, "", 3000);
    }

    public CunstomoThread(int id){
        this.id = id;
    }

    //      1.multi，开启Redis的事务，置客户端为事务态。
//      2.exec，提交事务，执行从multi到此命令前的命令队列，置客户端为非事务态。
//      3.discard，取消事务，置客户端为非事务态。
//      4.watch,监视键值对，作用是如果事务提交exec时发现监视的键值对发生变化，事务将被取消。
    @Override
    public void run() {
        try {
            //Thread.sleep((int) Math.random() * 5000);//随机睡眠一下
            Thread.sleep(RandomUtil.Random_generatingLongBounded_withRange(0,20000L));
        } catch (Exception e) {
            e.printStackTrace();
        }

        String name = ChineseName.getName();
        String userId = UUIDUtil.RandomUUID();
        Jedis jedis = null;
        try {

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
            e.printStackTrace();

        } finally {
            String client = jedis.get(killGoodsName);
            if((Thread.currentThread().getId()+"").equals(client)){
                jedis.del(killGoodsName);
            }
            if (jedis != null) {
                jedis.close();
            }
        }
    }

    public static void main(String[] args) {
        int threadCount = 100;
        // 初始化参数
        Jedis jedis = JedisUtil.getJedis();
        jedis.set(killGoodsCount,"100");

        ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
        int clientNum = 10000;//模拟顾客数目
        for (int i = 0; i < clientNum; i++) {
            cachedThreadPool.execute(new CunstomoThread(i));//启动与顾客数目相等的消费者线程
        }
        //cachedThreadPool.shutdown();//关闭线程池
       while (true) {
           if (cachedThreadPool.isTerminated()) {
               System.out.println("所有的消费者线程均结束了");
               break;
           }
       }

    }

}
