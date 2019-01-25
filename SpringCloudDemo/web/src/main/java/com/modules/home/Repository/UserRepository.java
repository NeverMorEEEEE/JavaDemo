package com.modules.home.Repository;

import java.util.*;

import com.modules.home.domain.User;

public class UserRepository {
	
	private final Map<String,User> users = new HashMap<String,User>(); 
	
	
	public void save(User user) {
		users.put(user.getName(),user);
	
	}
	
	public User findByName(String name) {
		return users.get("name"); 
	}
	
	

}
