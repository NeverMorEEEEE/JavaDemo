package com.modules.order.controller;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.modules.order.entity.Order;
import com.modules.order.mapper.OrderMapper;
import com.util.validator.POJOValidator;
import com.util.Tools;

@Controller
@EnableAutoConfiguration
public class OrderController {
	
	@Autowired
	OrderMapper orderMapper;
	
	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	private JdbcTemplate dbTemplate;
	
	@RequestMapping("/createOrder")
    @ResponseBody
    String createOrder(Order order) {
		int count = 0;
		
		if(POJOValidator.OrderValidity(order)) {
			String id = UUID.randomUUID().toString();
			order.setOrderId(id);
			System.out.println(order);
			count = orderMapper.save(order);
			saveLocalMessage(order);
	        return "{'code':'0','msg':'成功生成订单！','orderId':'" + id + "'}";
		}else{

			return "{'code':'-1','msg':'输入参数不合法，请重新检验！'}";
		}

    }
	
	
	void saveLocalMessage(Order order) {
		dbTemplate.update("insert into to_dispatch_message(unique_id,msg_content,msg_status,create_time) values(?,?,?,?);",
				UUID.randomUUID().toString(),Tools.objectToJson(order),0,Tools.getLocalDateStr());
	}
	
}
