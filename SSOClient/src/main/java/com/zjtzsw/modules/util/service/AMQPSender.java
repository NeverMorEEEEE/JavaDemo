package com.zjtzsw.modules.util.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.support.CorrelationData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zjtzsw.modules.order.entity.OrderEntity;


@Component
public class AMQPSender {
	private Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private RabbitTemplate rabbitTemplate;

	public void sendDirectQueue(String queue,JSONObject msg) {
		System.out.println("MSG : " + msg);
		MessageProperties messageProperties = new MessageProperties();
        messageProperties.setContentType("json");
		// 第一个参数是指要发送到哪个队列里面， 第二个参数是指要发送的内容
//		this.rabbitTemplate.send("","order", MessageBuilder.withBody(msg.getBytes()).
//                andProperties(messageProperties).build());

        this.rabbitTemplate.convertAndSend("order", msg,new CorrelationData(msg.getString("id")));
		log.info("【sendDirectQueue已发送消息】");
	}
	
	public void sendDirectOrder(String queue,OrderEntity order) {
		System.out.println("Obj : " + order);
		MessageProperties messageProperties = new MessageProperties();
        messageProperties.setContentType("json");
		// 第一个参数是指要发送到哪个队列里面， 第二个参数是指要发送的内容
//		this.rabbitTemplate.send("","order", MessageBuilder.withBody(msg.getBytes()).
//                andProperties(messageProperties).build());
        this.rabbitTemplate.convertAndSend("order",JSON.toJSON(order),new CorrelationData(order.getOrderid()));
		log.info("【sendDirectQueue已发送消息】");
	}

}