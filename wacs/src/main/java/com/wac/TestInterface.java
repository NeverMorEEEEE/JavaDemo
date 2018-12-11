package com.wac;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class TestInterface {
	private Map<String, String> param = new HashMap<String, String>();
	//private static String[] certCode = {"jx_gaj_cer_116","jx_jyj_cer_298"};
	public void getInfo() throws UnsupportedEncodingException {
		
		
	}
    public static String testCertificate(String busiCode) throws UnsupportedEncodingException {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		//证件信息
		//HttpPost httppost = new HttpPost("http://10.22.233.43:8081/fx_certificate");
		//pdf信息
		HttpPost httppost = new HttpPost("http://10.22.233.43:8081/fx_file");
		//String username = "jx_rsj_acc_0157";
		String username = "ph_rsj_acc_0175";	
		String secret = "e10adc3949ba59abbe56e057f20f883e";
		String nonce = UUID.randomUUID().toString();
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		String created = sdf.format(new Date());
		String passwdDigest = MD5(nonce + "_" + created + "_" + secret);
		httppost.addHeader("Username", username);
		httppost.addHeader("PasswdDigest", passwdDigest);
		httppost.addHeader("Nonce", nonce);
		httppost.addHeader("Created", created);
		httppost.addHeader("ApplicantUnit", URLEncoder.encode("人社局", "UTF-8"));
		httppost.addHeader("ApplicantUser", URLEncoder.encode("王斌", "UTF-8"));
		httppost.addHeader("ApplicantUserKey", "111");
		// 创建参数队列
		String cerNo = "330402199205280926";
		String itemCode = "ph_rsj_it_03130";
		String certCode = "jx_gaj_cer_117";
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
     	//证件编码
		//formparams.add(new BasicNameValuePair("certCode", "js_gsj_cer_101	"));
		/*String fxm = "王凯";
		String mxm = "朱霞";
		String fsfz = "330421197101160532";
		String msfz = "330421197207070025";
		formparams.add(new BasicNameValuePair("otherParam","{\"fxm\":\""+fxm+"\",\"mxm\":\""+mxm+"\",\"fsfz\":\""+fsfz+"\",\"msfz\":\""+msfz+"\"}"));*/
		//formparams.add(new BasicNameValuePair("otherParam", "{\"corpName\":\"嘉兴市水务投资集团有限公司\"}"));
		//formparams.add(new BasicNameValuePair("otherParam", "{\"name\":\"冯为萍\"}"));
		//formparams.add(new BasicNameValuePair("otherParam", "{\"uniscid\":\"9133048377826412XH\"}"));
		formparams.add(new BasicNameValuePair("busiCode",nonce));
		formparams.add(new BasicNameValuePair("cerNo",cerNo));//
		formparams.add(new BasicNameValuePair("itemCode",itemCode));//
		formparams.add(new BasicNameValuePair("certCode",certCode));
		UrlEncodedFormEntity uefEntity;	
		System.out.println(httppost);
		
		System.out.println("formparams"+formparams);
		try {
			uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
			httppost.setEntity(uefEntity);
			System.out.println("executing request " + httppost.getURI());
			CloseableHttpResponse response = httpClient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					System.out.println("--------------------------------------");
					String result = EntityUtils.toString(entity, "UTF-8");
					//System.out.println("Response content: " + EntityUtils.toString(entity, "UTF-8"));
					System.out.println("--------------------------------------");
					return result;
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源
			try {
				httpClient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
	//}
		return null;
		
}
	public static void main(String[] args) throws IOException {
		//个人信息
		//String result = testCertificate("111", "330722198301240323", "js_rsj_it_00079");
		//结婚证信息
		//String result = testCertificate("111", "330722198301240323", "js_rsj_it_00080");
		//String result = testCertificate("111", "330402196803212129", "js_rsj_it_00079");
		//String result = testCertificate("111", "330402196803212129", "jx_rsj_it_02327");
		//String result = testCertificate("111", "330421194111135011", "js_rsj_it_00079");
		//String result = testCertificate("111", "330421194111135011", "js_rsj_it_00080");
		//String[] results={"","",""};
		String str = testCertificate("111");
		System.out.println(str);
		/*JSONObject data = (JSONObject) JSON.parse(str);
		JSONArray array1 = data.getJSONArray("certs");
		JSONObject json2 = (JSONObject) JSON.parse(array1.getString(0));
		JSONArray array2 = json2.getJSONArray("certData");
		JSONObject json3 = (JSONObject) JSONObject.parse(array2.getString(0));*/
		//System.out.println(json3.getString("XM")+json3.getString("ZZXZ"));
		
		/*JSONArray array1 = data.getJSONArray("certs");
		net.sf.json.JSONObject json2 = net.sf.json.JSONObject.fromObject(array1.get(0));
		net.sf.json.JSONArray array2 = json2.getJSONArray("certData");
		net.sf.json.JSONObject json3 =  net.sf.json.JSONObject.fromObject(array2.get(0));
		System.out.println(json3);*/
		/*String XM = json3.getString("XM");
		String ZZXZ = json3.getString("ZZXZ");
		String SFZH = json3.getString("SFZH");
		System.out.println(XM+"&&"+ZZXZ+"&&"+SFZH);*/
		
	/*	 results[i] = testCertificate("111",i);
		 System.out.println(results[i]);
		 if(results[i] == null ){
			 results[i] = "";
		 }	
		 JSONObject parse = (JSONObject) JSONObject.parse(results[i]);	
		 String returnMessage = parse.getString("returnMessage");
		 System.out.println(returnMessage);
		 byte[] binary  = (new sun.misc.BASE64Decoder()).decodeBuffer(parse.getString("certFile").replaceAll(" ", ""));
		 File file = new File("-demo"+(i+1)+".pdf");
		 OutputStream output = new FileOutputStream(file);
		 BufferedOutputStream bufferedOutput = new BufferedOutputStream(output);
		 bufferedOutput.write(binary);
		 bufferedOutput.close();
		*/
		
		//String result = testCertificate("111", "330722198301240323", "js_rsj_it_00080");
		//System.out.println(result);
		
		//System.out.println("result====="+result);
	}
	public static String MD5(String s){
	    char hexDigits[]={'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
}
}
