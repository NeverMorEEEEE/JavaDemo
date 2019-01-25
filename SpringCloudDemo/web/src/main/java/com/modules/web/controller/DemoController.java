package com.modules.web.controller;

import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageDeliveryMode;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.config.RabbitMQConfig;

@Controller
@EnableAutoConfiguration
public class DemoController {

	@Autowired
	RabbitTemplate rabbitTemplate;

	@RequestMapping("/web/index")
	public String index(HttpServletRequest request, Model model) {
		model.addAttribute("port", request.getLocalPort());
		List arrs = new LinkedList();
		arrs.add("alpha");
		arrs.add("beta");
		arrs.add("detla");
		model.addAttribute("value", arrs);

		System.out.println(model);
		return "index";
	}

	@RequestMapping(value="/hello",produces="application/json;charset=utf-8")
	@ResponseBody
	String home() {
		return "我靠，中文为什么不行？";
	}

	@RequestMapping("/mqDemo")
	@ResponseBody
	String MQDemo(String msg) {
		
		rabbitTemplate.convertAndSend("","OrderToDispatch",msg,mes -> {
			System.out.println("messagePostProcessor working!");
			System.out.println(new String(mes.getBody()));
		    mes.getMessageProperties().setDeliveryMode(MessageDeliveryMode.NON_PERSISTENT);
		        return mes;
		});

//		rabbitTemplate.convertAndSend(user);
		// 发送消息到指定的交换器，指定的路由键，设置消息 ID
//		rabbitTemplate.convertAndSend("direct.exchange","key.1",user,new CorrelationData(UUID.randomUUID().toString()));

//		rabbitTemplate.send("OrderToDispatch", "deliver",new Message(msg.getBytes(), null));

		return "Hello World!";
	}

}
