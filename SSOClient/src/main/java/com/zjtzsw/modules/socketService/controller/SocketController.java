package com.zjtzsw.modules.socketService.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/socket")
public class SocketController {

	@RequestMapping("/index")
	public Object index(Model model, String keyword) {

		System.out.println("keyword : " + keyword);
		model.addAttribute("keyword", keyword);

		return "socket/index";
	}
}
