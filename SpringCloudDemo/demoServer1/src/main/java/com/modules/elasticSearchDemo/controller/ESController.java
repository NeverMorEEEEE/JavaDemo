package com.modules.elasticSearchDemo.controller;

import java.util.Date;

import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.xcontent.XContentFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ESController {

	@Autowired
	private TransportClient client;

	/**
	 *      * 添加索引      
	 */
	@RequestMapping(value = "/esDemo")
	public void testIndex() throws Exception {

		IndexResponse response = client.prepareIndex("user", "tweet", "1")
				.setSource(XContentFactory.jsonBuilder().startObject().field("user", "kimchy")
						.field("postDate", new Date()).field("message", "trying out Elasticsearch").endObject())
				.get();
		System.out.println("索引名称：" + response.getIndex());
		System.out.println("类型：" + response.getType());
		System.out.println("文档ID：" + response.getId()); // 第一次使用是1
		System.out.println("当前实例状态：" + response.status());
	}

}
