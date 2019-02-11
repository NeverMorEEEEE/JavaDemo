package wac.toy;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import sun.misc.BASE64Encoder;
import wac.utils.Md5;

import com.alibaba.fastjson.JSONObject;
import com.tzsw.core.util.DateUtil;

public class RestDemo {


    public static void main(String[] args) throws IOException {
        String url = "http://10.83.79.92:7001/TZAppService/ExServlet";
        String appid = "QLYG";
        String appkey = "2DKYYLDNB8L03E63TJHW";
        String sname = "QL001";
        String aeracode = "090001";
        //执行统一受理功能添加
        //header
        HttpHeaders headers = new HttpHeaders();
        String requesttime = String.valueOf(System.currentTimeMillis());
        requesttime = "1531969419418";

        //	headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("APPID", appid);
        headers.add("APPKEY", appkey);
        headers.add("TIMESTAMP", requesttime);
        headers.add("SNAME", sname);
        headers.add("AERACODE", aeracode);

        //body
        JSONObject body = new JSONObject();
        body.put("Pages", "1");
        body.put("PageSizes", "10");
        body.put("PlatformTypes", "1");
        JSONObject data = new JSONObject();
        data.put("bod052", "bod006");
        data.put("bod010", "bod007");
        data.put("BOD011", "bod008");
        data.put("BOD012", "bod005");
        data.put("BOD001", "bod001");
        data.put("AGA001", "aga001");
        System.out.println(data.toString());
        body.put("data", data.toString());
        body.put("AAC002", "bod008");
        body.put("AAC003", "bod007");

        System.out.println(body.toString());
        System.out.println(body.toJSONString());
        BufferedReader bf = new BufferedReader(new FileReader("test.txt"));
        String jsonstr = bf.readLine();
        System.out.println(jsonstr);
//		jsonstr = "{\"Data\":{\"AAC001\":801920488}}";
        System.out.println(jsonstr);
        String ss = new BASE64Encoder().encode(jsonstr.getBytes()).replaceAll("\r|\n", "");
        System.out.println(" ss : " + ss);
        String temp = appkey + requesttime + sname + ss;
        System.out.println("appkey + requesttime + sname + ss : " + temp);
//		String sign = MD5.getMD5ofStr(temp);
        String sign = Md5.md5(temp, "UTF8");
        System.out.println("sign : " + sign);
        headers.add("SIGN", sign);

        System.out.println(headers);
        HttpEntity<Object> request = new HttpEntity<Object>(body, headers);


        Object result = new RestTemplate().postForObject(url, request, String.class);
        System.out.println(result);
    }
}
