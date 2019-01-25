package com.modules.order.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.modules.home.domain.Role;
import com.modules.order.entity.Dispatch;
import com.modules.order.entity.Order;

@Mapper
public interface DispatchMapper {  
		
	@Insert("insert into wac.dispatch(order_id,consumer_name,consumer_phone,consumer_id,consumer_address,actual_pay_discount,pay_before_discount,discount_amount,discount_id) values (#{orderId},#{consumerName},#{consumerPhone},"
			+ "#{consumerId},#{consumerAddress},#{actualPayDiscount},#{payBeforeDiscount},"
			+ "#{discountAmount},#{discountId})")
	public int save(Dispatch dispatch);

	  
}
