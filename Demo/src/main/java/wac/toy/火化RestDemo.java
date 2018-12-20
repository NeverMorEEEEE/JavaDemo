package wac.toy;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.util.Date;

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

public class 火化RestDemo {
	
	public static String md5(String encryString,String string){
		try
		{
			MessageDigest digest = MessageDigest.getInstance("MD5");
			digest.update(encryString.getBytes(string));
			byte b[] = digest.digest();
			int i;

			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++)
			{
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			digest = null;
			b = null;
			return buf.toString();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return encryString;
	}

	
	public static void main(String[] args) throws IOException {
		StringBuffer url = new StringBuffer("http://172.16.156.185:8091/api/biz/share/platform?interfaceCode=3j69JN4dkG4a1Adb&cardId=330511195402144214&additional=%7B%22powerMatters%22%3A%22%E7%BB%99%E4%BB%98-00144-00%22%2C%22accesscardId%22%3A%22%E5%B8%82%E6%9C%AC%E7%BA%A7%E6%B5%8B%E8%AF%95%22%2C%22subPowerMatters%22%3A%22%E7%BB%99%E4%BB%98-00144-002%22%7D");
		String appSercurity = "772c92121025558a178c6ef9b52f5bd0";
		String appkey = "550531d5342a9eb0438404847ddba419";

		url.append("&appKey=" + appkey);
		//执行统一受理功能添加
		String requestTime = String.valueOf(System.currentTimeMillis());
		requestTime = "1532316080129";
		System.out.println(requestTime);
		System.out.println(new Date().getTime());
		url.append("&requestTime=" + requestTime);
		
		String temp = appkey + appSercurity + requestTime;
		System.out.println(" appkey + appSercurity + requestTime : " + temp);
		
		String sign = Md5.md5(temp, "UTF8");
		System.out.println(sign);
		sign = 火化RestDemo.md5(temp, "UTF-8");
		System.out.println(sign);
		url.append("&sign=" + sign);
		
		System.out.println(url.toString());
		
		//sign = 9f48610f658e37c7d082fff3b2e528c2 requestTime = 1531886602370
		
	}
}
