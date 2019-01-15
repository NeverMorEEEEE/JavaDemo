package com.zjtzsw.modules.socketService.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/socket")
public class SocketController{

	 @RequestMapping("/index")
	    public Object index(){

			return "socket/index";
	    }
}
