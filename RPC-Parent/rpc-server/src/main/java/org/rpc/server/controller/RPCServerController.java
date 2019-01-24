package org.rpc.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;

@Controller
public class RPCServerController {

	@RequestMapping("/rpc-server")
	public Object demo(JSONObject in){
		System.out.println("IN : " + in);
		return in;
		
		
	}
}
