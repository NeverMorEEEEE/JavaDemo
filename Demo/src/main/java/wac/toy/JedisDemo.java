package wac.toy;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.redis.connection.jedis.JedisUtils;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import wac.utils.redis.JedisUtil;

public class JedisDemo {
	
	public static void main(String[] args) {
		JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        // 设置最大10个连接
        jedisPoolConfig.setMaxTotal(20);
		JedisPool jedisPool = new JedisPool(jedisPoolConfig,"144.101.6.3",6379,6000,"jtzsw_redis");
		System.out.println(jedisPool.getResource());
//		JedisUtil.setJedisPool(jedisPool);
//		JedisUtil.set("wac", "handsome");
//		Object obj = JedisUtil.get("wac");
//		System.out.println(obj);
	}

}
