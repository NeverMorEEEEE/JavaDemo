package com.zjtzsw.modules.sys.util.springSession;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.context.ApplicationContext;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.ExpiringSession;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.data.redis.RedisOperationsSessionRepository;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.jfinal.core.JFinal;

/**
 * 从Redis中查询spring session
 * @author Lintel
 * @date 2016年8月2日 下午4:05:44
 *
 */
public class SpringSessionDao {
	
	private static SpringSessionDao dao = null;
	
	private ApplicationContext applicationContext;
	private RedisTemplate<Object, Object> redisTemplate;
	private RedisOperationsSessionRepository redisOperationsSessionRepository;
	
	//XXX 改造之前的获取实例方法 by yuanzp
	public static SpringSessionDao getInstance() {
		if (dao == null) {
			synchronized (SpringSessionDao.class) {
				if (dao == null) {
					dao = new SpringSessionDao();
				}
			}
		}
		return dao;
	}
	
	@SuppressWarnings("unchecked")
	public SpringSessionDao() {
		redisTemplate = getApplicationContext().getBean("redisTemplate", RedisTemplate.class);
		redisOperationsSessionRepository = new RedisOperationsSessionRepository(redisTemplate.getConnectionFactory());
		redisOperationsSessionRepository.setDefaultSerializer((RedisSerializer<Object>) redisTemplate.getDefaultSerializer());
	}
	
	/**
	 * 根据session id获取session
	 * @param key
	 * @return
	 */
	public ExpiringSession getSession(String sessionId) {
		return redisOperationsSessionRepository.getSession(sessionId);
	}
	
	/**
	 * 根据索引获取所有session
	 * @param value
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Map<String, ExpiringSession> getSessionByIndex(String index, String value) {
		Object map = redisOperationsSessionRepository.findByIndexNameAndIndexValue(index, value);
		return (Map<String, ExpiringSession>) map;
	}
	
	/**
	 * 根据默认索引获取session，确保根据这个索引获取的session只有一个
	 * @param value
	 * @return
	 */
	public ExpiringSession getSessionByDefaultIndex(String value) {
		Map<String, ExpiringSession> map = getSessionByIndex(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, value);
		if (map!=null && !map.isEmpty()) {
			return map.get(map.keySet().toArray()[0]);
		} else {
			return null;
		}
	}
	
	/**
	 * 返回所有session
	 * @return
	 */
	public List<ExpiringSession> getSessionList() {
		List<ExpiringSession> list = new ArrayList<>();
		Iterator<String> iterator = getSessionIds().iterator();
		
		while (iterator.hasNext()) {
			ExpiringSession session = getSession(iterator.next());
			if (session != null) {
				list.add(session);
			}
		}
		
		return list;
	}
	
	/**
	 * 根据session id删除session
	 * @param key
	 * @return
	 */
	public void delSession(String sessionId) {
		redisOperationsSessionRepository.delete(sessionId);
	}
	
	/**
	 * 清空所有session
	 */
	public void clearSessions() {
		Iterator<String> iterator = getSessionIds().iterator();
		
		while (iterator.hasNext()) {
			delSession(iterator.next());
		}
	}
	
	/**
	 * 枚举所有session id
	 * @return
	 */
	public Set<String> getSessionIds() {
		final String SPRING_SESSION_NAMESPACE = "spring:session:sessions";
		final String SPRING_SESSIONEXPIRES_NAMESPACE = SPRING_SESSION_NAMESPACE + ":expires";
		
		Set<Object> idSet = redisTemplate.keys(SPRING_SESSION_NAMESPACE+"*");
		Set<String> ids = new HashSet<String>();
		Iterator<Object> iterator = idSet.iterator();
		
		while (iterator.hasNext()) {
			String id = iterator.next().toString();
			if (id.startsWith(SPRING_SESSIONEXPIRES_NAMESPACE)) continue;
			if (!ids.contains(id)) ids.add(id.replace(SPRING_SESSION_NAMESPACE+":", ""));
		}
		
		return ids;
	}
	
	/**
	 * 获取应用上下文
	 * @return
	 */
	private ApplicationContext getApplicationContext() {
		if (this.applicationContext == null) {
			this.applicationContext = WebApplicationContextUtils.getWebApplicationContext(JFinal.me().getServletContext());
		}
		
		return this.applicationContext;
	}
}
