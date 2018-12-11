package com.opslab.util.hashMap;

import java.util.AbstractMap;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * 模拟哈希Map的工作机制，自己实现
 * n-1 & hash    ====>    hash%n
 * @author wac
 * @date 2018年6月22日
 * @param <K>
 * @param <V>
 */
public class HashMapDemo<K, V> extends AbstractMap<K, V>{
	
	public static void main(String[] args) {
		Map map = new HashMap();
	}

	@Override
	public Set<java.util.Map.Entry<K, V>> entrySet() {
		// TODO Auto-generated method stub
		return null;
	}

}
