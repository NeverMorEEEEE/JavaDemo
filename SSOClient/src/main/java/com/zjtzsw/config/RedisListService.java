package com.zjtzsw.config;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

@Service
public class RedisListService{
	
	public RedisListService(){
		System.out.println("初始化RedisService！");
	}

	@SuppressWarnings("rawtypes")
	@Autowired
	private RedisTemplate<String, String> redisTemplate;
	
	 /**
     * @description 简单的往数组里面添加元素
     * @param key
     * @param value
     */
   
    public void lPush(String key, String value) 
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        int backValue = oper.leftPush(key, value).intValue();
        System.out.println("返回值 : " + backValue);
    }
    
    /**
     * @description 批量往数组里面添加元素
     * @param key
     * @param list
     */
    public void lPushAll(String key, List<String> list)
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        int backValue = oper.leftPushAll(key, list).intValue();
        System.out.println("返回值 : " + backValue);
    }
    
    /**
     * @description  对指定下标的数组元素进行替换
     * @param key
     * @param offset
     * @param value
     */
   
    public void set(String key, int offset, String value) 
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        oper.set(key, offset, value);
    }
    
    /**
     * @description  对指定下标的数组进行插入数据
     * @param key
     * @param value1    原有值
     * @param value2    插入的值
     */
   
    public void insert(String key, String value1, String value2) 
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        int backValue = oper.leftPush(key, value1, value2).intValue();
        System.out.println("返回值 : " + backValue);
    }

    /**
     * @description  获取指定下标的数组元素
     * @param key
     * @param offset
     */
   
    public void getValueByIndex(String key, int offset)
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        String value = oper.index(key, offset);
        System.out.println(offset + "位置下的值为 : " + value);
    }

    /**
     * @description  获取数组长度
     * @param key
     */
   
    public void size(String key) 
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        int length = oper.size(key).intValue();
        System.out.println(key + " 数组长度为 : " + length);
    }
    
    /**
     * @description 移除数组匹配到的数据元素
     * @param key
     * @param count     负数：从右往左     整数：从左往右
     * @param value  移除的值
     */
   
    public void remove(String key, long count, String value) 
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        int backValue = oper.remove(key, count, value).intValue();
        System.out.println(key + " 数组长度为 : " + backValue);
    }
    
    /**
     * @description 保留区间内的元素，区间外的全部删除
     * @param key
     * @param start  区间开始
     * @param end    区间结束
     */
   
    public void trim(String key, int start, int end) 
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        oper.trim(key, start, end);
    }
    
    /**
     * @description 从左到右，删除第一个元素
     * @param key
     */
    public void lpop(String key)
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        String value = oper.leftPop(key);
        System.err.println("移除的元素 ： " + value);
    }
    
    
    /**
     * @description  查询区间范围内的元素
     * @param key
     * @param start
     * @param end
     */
   
    public void lrange(String key, int start, int end) 
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        List<String> list = oper.range(key, start, end);
        for(String str : list)
        {
            System.out.println("遍历 ： " + str);
        }    
    }
    
    /**
     * @description 两个list之间移元素
     * @param sourceKey        源
     * @param destinationKey  目的地
     */
    public void rightPopAndLeftPush(String sourceKey, String destinationKey) 
    {
        ListOperations<String, String> oper = redisTemplate.opsForList();
        String v = oper.rightPopAndLeftPush(sourceKey, destinationKey);
        System.out.println("----------" + v);
    }
    
    
	
	public static void main(String[] args) {

	}
}
