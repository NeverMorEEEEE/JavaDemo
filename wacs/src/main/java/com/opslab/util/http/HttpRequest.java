package com.opslab.util.http;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;


import net.sf.json.JSONObject;

public class HttpRequest {
	 /**
     * 向指定URL发送GET方法的请求
     * 
     * @param url
     *            发送请求的URL
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return URL 所代表远程资源的响应结果
     */
    public static String sendGet(String url, String param) {
        String result = "";
        BufferedReader in = null;
        try {
            String urlNameString = url + "?" + param;
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection(); 
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 建立实际的连接
            connection.connect();
            // 获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();
            // 遍历所有的响应头字段
            for (String key : map.keySet()) {
                System.out.println(key + "--->" + map.get(key));
            }
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream(), "utf-8"));
          
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("发送GET请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }

    /**
     * 向指定 URL 发送POST方法的请求
     * 
     * @param url
     *            发送请求的 URL
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return 所代表远程资源的响应结果
     */
    public static String sendPost(String url, String param) {
        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();  
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setConnectTimeout(30000);  
            conn.setReadTimeout(30000);  
            conn.setDoOutput(true);  
            conn.setDoInput(true);  
            conn.setUseCaches(false);     
            conn.setRequestProperty("Charsert", "UTF-8");  
            conn.setRequestProperty("contentType", "UTF-8");  
            conn.setRequestProperty("timenow", String.valueOf(System.currentTimeMillis()));
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            out.print(param);
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(),"utf-8"));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("发送 POST 请求出现异常！"+e);
            result="{\"result\":\"01\",\"msg\":\""+e.toString()+"\"}";
            //e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result;
    }    
    public static void main(String[] args) {
        //发送 GET 请求
        
        
        //发送 POST 请求
    	
		
		new Thread(new Runnable() {
			
			@Override
			public void run() {
				String url = "http://127.0.0.1:8081/business/download";
				//String xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><RECORD><!-- 调用方法信息--><CALLINFO><CALLER>一窗受理平台的系统名称，如杭州市一窗受理平台</CALLER> <CALLTIME>接口的调用发送时间</CALLTIME> <CALLBACK_URL>一窗受理平台数据反馈接收地址</CALLBACK_URL></CALLINFO><PROJID>申报号</PROJID><PROJPWD>查询密码</PROJPWD><IS_MANUBRIUM>是否是在垂管系统中运行的事项</IS_MANUBRIUM><SERVICECODE>权力事项编码</SERVICECODE><SERVICE_DEPTID>事项终审部门编码</SERVICE_DEPTID><BUS_MODE>办理方式</BUS_MODE><BUS_MODE_DESC>办理方式说明</BUS_MODE_DESC><SERVICEVERSION>权力事项版本号</SERVICEVERSION><SERVICENAME>权力事项名称</SERVICENAME><PROJECTNAME>申报名称</PROJECTNAME><INFOTYPE>办件类型</INFOTYPE>< BUS_TYPE >业务类型</ BUS_TYPE >< REL_BUS_ID>关联业务标识</ REL_BUS_ID ><APPLYNAME>申报者名称</APPLYNAME><APPLY_CARDTYPE>申报者证件类型</APPLY_CARDTYPE><APPLY_CARDNUMBER>申报者证件号码</APPLY_CARDNUMBER><CONTACTMAN>联系人/代理人姓名</CONTACTMAN><CONTACTMAN_CARDTYPE>联系人/代理人证件类型</CONTACTMAN_CARDTYPE><CONTACTMAN_CARDNUMBER>联系人/代理人证件号码</CONTACTMAN_CARDNUMBER><TELPHONE>联系人手机号码</TELPHONE><POSTCODE>邮编</POSTCODE><ADDRESS>通讯地址</ADDRESS><LEGALMAN>法人代表</LEGALMAN><DEPTID>收件部门标识</DEPTID><DEPTNAME>收件部门名称</DEPTNAME><APPLYFROM>申报来源</APPLYFROM><APPROVE_TYPE>审批类型</APPROVE_TYPE><APPLY_PROPERTIY>项目性质</APPLY_PROPERTIY><RECEIVETIME>申报时间</RECEIVETIME><BELONGTO>项目关联号</BELONGTO><AREACODE>收件部门所属行政区划编码</AREACODE><DATASTATE>数据状态</DATASTATE><BELONGSYSTEM>所属系统</BELONGSYSTEM><EXTEND>备用字段</EXTEND><DATAVERSION>版本号</DATAVERSION><SYNC_STATUS>同步状态</SYNC_STATUS><RECEIVE_USEID>收件人ID</RECEIVE_USEID><RECEIVE_NAME>创建用户名称</RECEIVE_NAME><CREATE_TIME>数据产生时间</CREATE_TIME><SS_ORGCODE>实施机构组织机构代码</SS_ORGCODE><MEMO>备注</MEMO></RECORD>";
				//String param = "baseInfoXml="+xml;
				//String param = "TRANSACTXML=<?xml version=\"1.0\" encoding=\"gb2312\"?><RECORD><PROJID>申报号</PROJID><TRANSACT_USER>办理人员姓名</TRANSACT_USER><HANDER_DEPTNAME>办理人所属部门名称</HANDER_DEPTNAME><HANDER_DEPTID>办理人所属部门编码</HANDER_DEPTID><AREACODE>办理人所属部门的所在行政区划编码</AREACODE><TRANSACT_TIME>办结日期</TRANSACT_TIME><TRANSACT_RESULT>办理结果</TRANSACT_RESULT><TRANSACT_DESCRIBE>办理结果描述</TRANSACT_DESCRIBE><RESULT_CODE>结果编号</RESULT_CODE><REMARK>备注</REMARK><BELONGSYSTEM>所属系统标识</BELONGSYSTEM><SYNC_STATUS>同步状态</SYNC_STATUS><CREATE_TIME>数据产生时间</CREATE_TIME><EXTEND>备用字段</EXTEND><DATAVERSION>版本号</DATAVERSION></RECORD>&ATTRXML=<?xml version=\"1.0\" encoding=\"gb2312\"?><RECORDS><RECORD><UNID>唯一标识</UNID><PROJID>申报号</PROJID><BELONGTO>所属对象关联号</BELONGTO><TYPE>附件产生阶段</TYPE><NAME>附件名称</NAME><CREATE_TIME>数据产生时间</CREATE_TIME><REMARK>备注</REMARK><BELONGSYSTEM>所属系统</BELONGSYSTEM><AREACODE>数据所属行政区划编码</AREACODE><EXTEND>备用字段</EXTEND><DATAVERSION>版本号</DATAVERSION><SYNC_STATUS>同步状态</SYNC_STATUS><FILEURL>附件提取路径</FILEURL><FILEPWD>附件提取密码</FILEPWD></RECORD></RECORDS>";
				//String param ="PRE_ATTR_INFO=<?xml version=\"1.0\" encoding=\"gb2312\" standalone=\"yes\"?><RECORDS><RECORD><FILES><FILEINFO><FILENAME>一窗受理平台双方对接文档0627.doc</FILENAME><FILEURL>http://10.85.3.102:80/oss-nanwei/upload/aaaaaaaaaaaaaaaaaaaaaaa001008010/201707/6ea6f5d1d32e4c678f64e848d4b75a8d/503ef80a76b04bad883dceb6f88c32da_一窗受理平台双方对接文档0627.doc</FILEURL><FILEPWD>654321</FILEPWD></FILEINFO></FILES><UNID>cb8046ff0fb744078e418ef93e83722d</UNID><PROJID>331001161707198000007</PROJID><ATTRNAME>《台港澳人员就业证》</ATTRNAME><SORTID>6</SORTID><TAKETYPE>附件上传</TAKETYPE><ISTAKE>1</ISTAKE><AMOUNT>1</AMOUNT><TAKETIME>2017-07-19 18:03:31</TAKETIME><MEMO></MEMO><AREACODE>331001</AREACODE><BELONGSYSTEM>33000099001</BELONGSYSTEM><ATTRID>c023b563-2313-4d00-8dec-dfd6f436585f</ATTRID><EXTEND></EXTEND><CREATE_TIME>2017-07-19 18:03:31</CREATE_TIME><SYNC_STATUS>I</SYNC_STATUS><DATAVERSION>1</DATAVERSION></RECORD></RECORDS>";
				String param = "UNID=cb8046ff0fb744078e418ef93e83722d&PROJID=331001161707198000007";
				String str = HttpRequest.sendPost(url, param);
				JSONObject json = JSONObject.fromObject(str);
				String bty1 = (String) json.get("CONTENT");
				  String fileName = "C:\\Users\\Administrator\\Desktop\\一窗受理对接方案_20170710_副本.doc";  
		            byte[] binary = null;
					try {
						binary = (new sun.misc.BASE64Decoder()).decodeBuffer(bty1.replaceAll(" ", ""));
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
		            File f = new File(fileName);  
		            InputStream in =  new ByteArrayInputStream(binary);
		            FileOutputStream fos = null;
					try {
						fos = new FileOutputStream(f);
					} catch (FileNotFoundException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
		            byte[] b = new byte[1024];  
		            int n=0;
		            try {
						while((n=in.read(b))!=-1){  
							fos.write(b, 0, n);;
						}
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}   
		            try {
						fos.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		            try {
						in.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} 
			}
		}).start();;
    }

    
}
