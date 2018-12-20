package wac.serialization;




import com.alibaba.fastjson.JSON;

import wac.learn.servilizeDemo.User;
import wac.utils.XmlConverUtil;

public class SerivalzeTest {

	
	public static void main(String[] args) {
		User user = new User();
		user.setUserName("HH");
		user.setPasswd("123456");
		user.setUserMsg("test");
		System.out.println(JSON.toJSON(user));
		System.out.println(JSON.toJSONString(user));
		
		String x1 = XmlConverUtil.jsontoXml(JSON.toJSON(user).toString());
		
		System.out.println(x1);
	}
}