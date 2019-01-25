package com.util.validator;

import com.modules.order.entity.Order;
import com.util.Tools;

public class POJOValidator {
	
	
	public static boolean OrderValidity(Order order) {
		if(Tools.isEmpty(order.getConsumerId())||Tools.isEmpty(order.getConsumerName())) {
			return false;
		}
		return true;
	}

}
