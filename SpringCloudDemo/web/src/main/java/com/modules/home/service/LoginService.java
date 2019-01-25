package com.modules.home.service;

import java.util.Map;

import com.modules.home.domain.Role;
import com.modules.home.domain.User;

public interface LoginService {
	 abstract Role addRole(Map<String, Object> map);
	 abstract User addUser(Map<String, Object> map);
	 abstract User findByName(String name);

}
