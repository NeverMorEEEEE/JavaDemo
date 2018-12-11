package com.zjtzsw.common.utils;

import java.io.File;
import java.io.IOException;

import net.sf.json.JSONObject;

import org.aspectj.util.FileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.serializer.JacksonJsonRedisSerializer;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;

import com.alibaba.fastjson.support.spring.FastJsonRedisSerializer;
import com.mchange.v2.ser.SerializableUtils;
import com.opslab.util.StringUtils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisUtil {

	static RedisSerializer jdkSerializer = new FastJsonRedisSerializer(Object.class);
//	private JdkSerializer serializer = new JdkSerializer();
	static{
		System.out.println("JedisUtil Loading!!!!");
	}
	
	private static Logger logger = LoggerFactory.getLogger(JedisUtil.class);
	  
	private static JedisPool jedisPool = null;
	
	public static Jedis getJedis() {
		return jedisPool.getResource();
	}


	public static void setJedisPool(JedisPool jedisPool) {
		System.out.println("!!!!!!!!!!! JedisPool Setting!!");
		JedisUtil.jedisPool = jedisPool;
	}

	public static JedisPool getJedisPool() {
		return jedisPool;
	}

	

	/**
	 * 新建Jedis连接池实例并尝试获取Jedis实例，获取失败则返回null
	 * 
	 * @param host
	 * @param port
	 * @param password
	 * @param timeout
	 * @return
	 */
	public static JedisPool init(String host, int port, String password, int timeout) {
		JedisPoolConfig config = new JedisPoolConfig();
		JedisPool jedisPool = null;
		
		try {
			if (StringUtils.isNotBlank(password)) {
				jedisPool = new JedisPool(config, host, port, timeout, password);
			} else {
				jedisPool = new JedisPool(config, host, port, timeout);
			}
			Jedis jedis = jedisPool.getResource();
			jedisPool.returnResource(jedis);
			
			return jedisPool;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	public static boolean delete(String key) {
		Jedis jedis = getJedis();
		
		boolean flag = jedis.del(key) > 0;
		returnResource(jedis);
		
		return flag;
	}
	
	
	public static boolean setFile(String aga001,File file){
		Jedis jedis = getJedis();
		if(file.exists()){
			try {
				jedis.set(aga001.getBytes(), FileUtil.readAsByteArray(file));
				return true;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		jedis.close();
		return false;
		
	}
	
	public static byte[] getFileByte(String aga001){
		Jedis jedis = getJedis();
		byte[] b = jedis.get(aga001.getBytes());
		
		jedis.close();
		
		return b;
	}
	
	
	 /**
     * 释放jedis资源
     * @param jedis
     */
    public static void returnResource(final Jedis jedis) {
        if (jedis != null) {
            jedis.close();
        }
    }

    /**
     * 获取redis键值-object
     * 
     * @param key
     * @return
     */
    public static Object get(String key) {
        Jedis jedis = null;
        try {
            jedis = getJedis();
            byte[] bytes = jedis.get(key.getBytes());
            if(!StringUtils.isEmpty(bytes)) {
            	
            	return jdkSerializer.deserialize(bytes);
//            	return SerializableUtils.fromByteArray(bytes);
//            	return JSONObject.fromObject(String.valueOf(bytes));
//                return org.apache.commons.lang3.SerializationUtils.deserialize(bytes);
            }
        } catch (Exception e) {
            logger.error("getObject获取redis键值异常:key=" + key + " cause:" + e.getMessage());
        } finally {
            jedis.close();
        }
        return null;
    }

    /**
     * 设置redis键值-object
     * @param key
     * @param value
     * @param expiretime
     * @return
     */
    public static String set(String key, Object value) {
        Jedis jedis = null;
        try {
        	
            jedis = getJedis();
         //   return jedis.set(key.getBytes(), JSONObject.fromObject(value).toString().getBytes());
            return jedis.set(key.getBytes(),jdkSerializer.serialize(value));
//            return jedis.set(key.getBytes(), SerializableUtils.toByteArray(value));
        } catch (Exception e) {
            logger.error("set设置redis键值异常:key=" + key + " value=" + value + " cause:" + e.getMessage());
            return null;
        } finally {
            if(jedis != null)
            {
                jedis.close();
            }
        }
    }

    public static String set(String key, Object value,int expiretime) {
        String result = "";
        Jedis jedis = null;
        try {
            jedis = getJedis();
            result = jedis.set(key.getBytes(),jdkSerializer.serialize(value));
//            result = jedis.set(key.getBytes(),JSONObject.fromObject(value).toString().getBytes());
            if(result.equals("OK")) {
                jedis.expire(key.getBytes(), expiretime);
            }
            return result;
        } catch (Exception e) {
            logger.error("set设置redis键值异常:key=" + key + " value=" + value + " cause:" + e.getMessage());
        } finally {
            if(jedis != null)
            {
                jedis.close();
            }
        }
        return result;
    }

    /**
     * 删除key
     */
    public static Long delkeyObject(String key) {
        Jedis jedis = null;
        try {
            jedis = getJedis();
            return jedis.del(key.getBytes());
        }catch(Exception e) {
            e.printStackTrace();
            return null;
        }finally{
            if(jedis != null)
            {
                jedis.close();
            }
        }
    }

    public static Boolean existsObject(String key) {
        Jedis jedis = null;
        try {
            jedis = getJedis();
            return jedis.exists(key.getBytes());
        }catch(Exception e) {
            e.printStackTrace();
            return null;
        }finally{
            if(jedis != null)
            {
                jedis.close();
            }
        }
    }
	
}
