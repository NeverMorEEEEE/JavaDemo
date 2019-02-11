package wac.serialization;


import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;

import wac.learn.servilizeDemo.User;
import wac.utils.XmlConverUtil;

public class SerivalzeTest {


    public static void main(String[] args) throws JsonGenerationException, JsonMappingException, IOException {
        User user = new User();
        user.setUserName("HH");
        user.setPasswd("123456");
        user.setUserMsg("test");
        System.out.println(user);
        System.out.println(JSON.toJSON(user));
        System.out.println(JSON.toJSONString(user));

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(user);
        System.out.println(json);

        String x1 = XmlConverUtil.jsontoXml(JSON.toJSON(user).toString());

        System.out.println(x1);
    }
}