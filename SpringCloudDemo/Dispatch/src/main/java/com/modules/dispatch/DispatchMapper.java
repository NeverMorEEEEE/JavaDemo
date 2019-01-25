package com.modules.dispatch;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.modules.dispatch.entity.Dispatch;

@Mapper
public interface DispatchMapper {  
		
	@Insert("insert into dispatch values(#{dispatch_id},#{orderid},#{Courier_id},#{Courier_name},"
			+ "#{Courier_phone},#{deadline},#{remarks})")
	public void save(Dispatch dispatch);  
	  
}
