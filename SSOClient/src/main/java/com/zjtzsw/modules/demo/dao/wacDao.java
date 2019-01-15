package com.zjtzsw.modules.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zjtzsw.modules.demo.entity.WacEntity;

@Mapper
public interface wacDao {
   int add(WacEntity demo);
    
   abstract List<WacEntity> query(WacEntity demo);
   
   WacEntity queryById(String id);
   
   abstract int delete(String id);
   
   abstract int update(WacEntity demo);

   int save(WacEntity demo);
   

}
