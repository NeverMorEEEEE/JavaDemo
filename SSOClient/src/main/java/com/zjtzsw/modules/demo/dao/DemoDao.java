package com.zjtzsw.modules.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zjtzsw.modules.demo.entity.DemoEntity;

@Mapper
public interface DemoDao {
   int add(DemoEntity demo);
    
   abstract List<DemoEntity> query(DemoEntity demo);
   
   DemoEntity queryById(String id);
   
   abstract int delete(String id);
   
   abstract int update(DemoEntity demo);

   int save(DemoEntity demo);
   

}
