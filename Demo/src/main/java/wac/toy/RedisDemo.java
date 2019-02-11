package wac.toy;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.context.annotation.Bean;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import wac.learn.servilizeDemo.User;
import wac.utils.redis.JedisUtil;

import com.alibaba.fastjson.JSONObject;
import com.zjtzsw.modules.sys.domain.UserInfo;

public class RedisDemo {

    static void init() {
//		Properties redis = new Properties();
//		redis.load(RedisDemo.class.getResourceAsStream("/redis.properties"));
//		JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        //
//		JedisPool jedisPool = new JedisPool(jedisPoolConfig, redis.getProperty("redis.host"), 
//				Integer.valueOf(redis.getProperty("redis.port")), Integer.valueOf(redis.getProperty("redis.timeout")),
//				redis.getProperty("redis.password"));
//		JedisUtil.setJedisPool (jedisPool);

    }


    public static void main(String[] args) throws FileNotFoundException, IOException {
        //		Map map = new HashMap();
        //		int ss = 1 << 31;
        //
        //		System.out.println( ss + " : " + Integer.toBinaryString(ss));
        //
        //
        //		System.out.println(Integer.MAX_VALUE + " : " + Integer.toBinaryString(Integer.MAX_VALUE));
        //		System.out.println(Integer.MIN_VALUE);
//		JedisUtil.init("144.101.6.3", 6379, "jtzsw_redis", 6000);
        JedisUtil.init("127.0.0.1", 6379, "jtzsw_redis", 6000);
        UserInfo us1 = new UserInfo();
        us1.setUserAccount("123");
        us1.setUserPass("wac");
//		JedisUtil.set("hhhhhhhhh", us1,500);
        JedisUtil.set("hhhhhhhhh", us1);
//		Object obj = jedis.get("hhhhhhhhh");
        Jedis jedis = JedisUtil.getJedis();


//		UserInfo user = (UserInfo) JedisUtil.get("hhhhhhhhh");

        UserInfo user = (UserInfo) JedisUtil.get("hhhhhhhhh");
        System.out.println(JSONObject.toJSONString(user));

        System.out.println(user);
//		UserInfo user = (UserInfo)obj;
//		System.out.println(user);
    }

}
