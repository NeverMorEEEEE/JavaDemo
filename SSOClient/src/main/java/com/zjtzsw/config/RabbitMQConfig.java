package com.zjtzsw.config;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;
import org.springframework.amqp.rabbit.support.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.fastjson.JSONObject;
import com.rabbitmq.client.Channel;

@Configuration
public class RabbitMQConfig {
	@Value("${rabbitmq.exchange}")
	private String exchange;

	@Value("${rabbitmq.routingkey}")
	private String routingkey;

	@Bean
	public Queue serverInlineQueue() {
		System.out.println("routingkey : " + routingkey);
		return new Queue(routingkey,true);
	}

	// 这边初始化是绑定交换机，延迟绑定（调用发送方法管理界面才显示）
	@Bean
	TopicExchange exchange() {
		return new TopicExchange(exchange);
	}

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
			public void confirm(CorrelationData correlationData, boolean ack,
					String cause) {
				System.out.println("=====消息进行消费了======");
				if (ack) {
					System.out.println("消息id为: " + correlationData
							+ "的消息，已经被ack成功");
				} else {
					System.out.println("消息id为: " + correlationData
							+ "的消息，消息nack，失败原因是：" + cause);
				}
			}
		});
		return rabbitTemplate;
	}
	
	/**
	 * 接收MQ中QUEUE为order的监听
	 * @param connectionFactory
	 * @return
	 */
//	@Bean
//    public SimpleMessageListenerContainer messageListenerContainer(ConnectionFactory connectionFactory){
//        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
//        container.setConnectionFactory(connectionFactory);
//        //队列可以是多个，参数是String的数组
//        container.setQueueNames("order");
//        container.setMessageListener(new ChannelAwareMessageListener(){
//            @Override
//            //得到了Channel参数，具体使用会在下面的博客详细讲解
//            public void onMessage(Message message, Channel channel) throws Exception {
//                System.out.println("====接收到Order消息=====");
//                System.out.println(message.getMessageProperties());
//                
//                
//                System.out.println(new JSON(message.getBody()));
//            }
//        });
//        return container;
//    }
	
//    @RabbitListener(queues = "order")
//    public void handle(JSONObject body){
//        System.out.println("=====注解方式接收处理MQ笑嘻嘻==========");
//        System.out.println(body);
//    }

}
