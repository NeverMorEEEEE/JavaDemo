package com.modules.home.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.modules.home.domain.Permission;
import com.modules.home.domain.Role;
import com.modules.home.domain.User;
import com.modules.home.mapper.RoleMapper;
import com.modules.home.mapper.UserMapper;
import com.modules.home.service.LoginService;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleMapper roleMapper;

    /**
     * 添加用户
     */
    @Override
    public User addUser(Map<String, Object> map) {
        User user = new User();
        user.setName(map.get("username").toString());
        user.setPassword(Integer.valueOf(map.get("password").toString()));
        userMapper.save(user);
        return user;
    }

    /**
     * 添加角色
     */
    @Override
    public Role addRole(Map<String, Object> map) {
        User user = userMapper.findOne(Long.valueOf(map.get("userId").toString()));
        Role role = new Role();
        role.setRoleName(map.get("roleName").toString());
        role.setUser(user);
        Permission permission1 = new Permission();
        permission1.setPermission("create");
        permission1.setRole(role);
        Permission permission2 = new Permission();
        permission2.setPermission("update");
        permission2.setRole(role);
        List<Permission> permissions = new ArrayList<Permission>();
        permissions.add(permission1);
        permissions.add(permission2);
        role.setPermissions(permissions);
        roleMapper.save(role);
        return role;
    }

    /**
     * 查询用户通过用户名
     */
    @Override
    public User findByName(String name) {
        return userMapper.findByName(name);
    }
}