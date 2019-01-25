package com.config;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;

import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.HeadersExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.connection.CorrelationData;

//import org.springframework.amqp.core.Correlation;
//import org.springframework.amqp.rabbit.support.CorrelationData;
import org.springframework.amqp.rabbit.support.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.handler.annotation.Header;

import com.alibaba.fastjson.JSONObject;
import com.modules.order.entity.Order;
import com.modules.order.service.CurierService;
import com.modules.order.service.DispatchService;
import com.rabbitmq.client.Channel;
import com.util.Tools;

@Configuration
public class RabbitMQConfig {
	private static Logger log = LoggerFactory.getLogger(RabbitMQConfig.class);
	private static final String topicExchangeName = "topic-exchange";
	private static final String fanoutExchange = "fanout-exchange";
	private static final String headersExchange = "headers-exchange";

	private static final String queueName = "OrderToDispatch";
	
	@Autowired
	DispatchService dispatchService;
	
/*	// 声明队列
	@Bean
	public Queue queue() {
		// Queue(String name, boolean durable, boolean exclusive, boolean autoDelete)
		return new Queue(queueName, true, true, true);
	}

	// 声明Topic交换机
	@Bean
	TopicExchange topicExchange() {
		return new TopicExchange(topicExchangeName);
	}

	// 将队列与Topic交换机进行绑定，并指定路由键
	@Bean
	Binding topicBinding(Queue queue, TopicExchange topicExchange) {
		return BindingBuilder.bind(queue).to(topicExchange).with("org.cord.#");
	}

	// 声明fanout交换机
	@Bean
	FanoutExchange fanoutExchange() {
		return new FanoutExchange(fanoutExchange);
	}

	// 将队列与fanout交换机进行绑定
	@Bean
	Binding fanoutBinding(Queue queue, FanoutExchange fanoutExchange) {
		return BindingBuilder.bind(queue).to(fanoutExchange);
	}

	// 声明Headers交换机
	@Bean
	HeadersExchange headersExchange() {
		return new HeadersExchange(headersExchange);
	}

	// 将队列与headers交换机进行绑定
	@Bean
	Binding headersBinding(Queue queue, HeadersExchange headersExchange) {
		Map<String, Object> map = new HashMap<>();
		map.put("First", "A");
		map.put("Fourth", "D");
		// whereAny表示部分匹配，whereAll表示全部匹配
		// return BindingBuilder.bind(queue).to(headersExchange).whereAll(map).match();
		return BindingBuilder.bind(queue).to(headersExchange).whereAny(map).match();
	}*/

	@Bean
	ConnectionFactory connectionFactory() {
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory("127.0.0.1", 5672);

		connectionFactory.setUsername("guest");
		connectionFactory.setPassword("guest");
//		connectionFactory.set
		connectionFactory.setPublisherConfirms(true); // enable confirm mode

		return connectionFactory;
	}

	@Bean
	public RabbitAdmin rabbitAdmin(ConnectionFactory connectionFactory) {
		RabbitAdmin rabbitAdmin = new RabbitAdmin(connectionFactory);
		return rabbitAdmin;
	}

	/*@Bean
	public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
		RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
		rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {

			*//**
			 * @param correlationData
			 *            唯一标识，有了这个唯一标识，我们就知道可以确认（失败）哪一条消息了
			 * @param ack
			 * @param cause
			 *//*
			@Override
			public void confirm(CorrelationData correlationData, boolean ack, String cause) {
				System.out.println("=====消息进行消费了======");
				if (ack) {
					System.out.println("消息id为: " + correlationData + "的消息，已经被ack成功");
				} else {
					System.out.println("消息id为: " + correlationData + "的消息，消息nack，失败原因是：" + cause);
				}
			}

		
		});
		return rabbitTemplate;
	}*/
	
	@Bean
	public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
		RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
		rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {

			/**
			 * @param correlationData
			 *            唯一标识，有了这个唯一标识，我们就知道可以确认（失败）哪一条消息了
			 * @param ack
			 * @param cause
			 */
			@Override
			public void confirm(CorrelationData correlationData, boolean ack, String cause) {
				System.out.println("=====消息进行消费了======");
				if (ack) {
					System.out.println("消息id为: " + correlationData + "的消息，已经被ack成功");
				} else {
					System.out.println("消息id为: " + correlationData + "的消息，消息nack，失败原因是：" + cause);
				}
			}

		
		});
		return rabbitTemplate;
	}
	
	
	@RabbitListener(queues=queueName)
	public void handler(String message,Channel channel,@Header(AmqpHeaders.DELIVERY_TAG) long tag) throws Exception {
		try {
			//字符串消息转回JSON
			System.out.println("收到字符串消息：" + message);
			JSONObject mes = JSONObject.parseObject(message);
			System.out.println("Message1 : " + mes);
			Order order = Tools.jsonToPojo(message, Order.class);
			System.out.println("Order : " + order);
			log.warn("收到MQ中的OrderToDispatch的消息：" + order.toString());
			Thread.sleep(2000L);
			
			//分配派送员
			String orderId = order.getOrderId();
			dispatchService.dispatch(orderId);
			// ACK,告诉MQ，我已经收到了
			channel.basicAck(tag, false);
			
		} catch (Exception e) {
			//异常情况，重发或者丢弃
			//重发一定次数之后，丢弃，日志警告（控制重发次数，将次数存放在Redis等内存中）
			//multiple：是否批量.true:将一次性拒绝所有小于deliveryTag的消息。
			//requeue：被拒绝的是否重新入队列
			channel.basicNack(tag, false, true);
		}
	}

}
