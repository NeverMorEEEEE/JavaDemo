package wac.toy;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import com.alibaba.fastjson.JSONObject;

public class StrDemo {
	public static void main(String[] args) throws IOException {
		BufferedReader bf = new BufferedReader(new FileReader("test.txt"));
		String jsonstr = bf.readLine();
		String temp = jsonstr.replaceAll("\\\"", "");
		System.out.println(jsonstr);
		JSONObject json = JSONObject.parseObject(jsonstr);
		System.out.println(json.keySet());
		
	}
}
