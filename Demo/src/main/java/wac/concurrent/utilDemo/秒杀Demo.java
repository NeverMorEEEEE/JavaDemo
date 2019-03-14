package wac.concurrent.utilDemo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import wac.utils.ChineseName;
import wac.utils.UUIDUtil;
import wac.utils.redis.JedisUtil;

import java.util.concurrent.CountDownLatch;

public class 秒杀Demo {
    private static Logger logger = LoggerFactory.getLogger(ThreadDemo.class);
    static CountDownLatch latch = new CountDownLatch(1);
    static String killGoods = "redmi_note_3_stock";
    static{
        JedisUtil.init("127.0.0.1",6379,"",3000);
    }




    public static void main(String[] args) {

    }
}
