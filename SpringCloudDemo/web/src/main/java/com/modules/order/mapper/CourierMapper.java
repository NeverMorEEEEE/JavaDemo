package com.modules.order.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.modules.home.domain.Role;
import com.modules.order.entity.Courier;
import com.modules.order.entity.Order;

@Mapper
public interface CourierMapper {  
		

	
	@Select("select * from wac.Courier where status =1")
	public List<Courier> getAllFreeCourier();
	
	@Select("select * from wac.Courier where status =1 limit 1")
	public Courier getOneFreeCourier();
	
	@Select("select * from wac.Courier")
	public List<Courier> getAllCourier();
	
	@Update("update wac.Courier set stats = #{status} where courierId = #{courierId}")
	public int updateCourierStatus(String courierId,int status);
	
	@Insert("insert into wac.Courier(courierId,courierName,courierPhone,status) values"
			+ " (#{courierId},#{courierName},#{courierPhone},#{status})")
	public int save(Courier courier);  
	
}
