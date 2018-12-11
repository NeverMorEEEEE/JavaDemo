package com.zjtzsw.modules.demo.util;
import java.io.ByteArrayInputStream;
import java.io.File;  
import java.io.InputStream;  
import java.util.ArrayList;
import java.util.HashMap;  
import java.util.Iterator;
import java.util.LinkedList;  
import java.util.List;  
import java.util.Map;  
  



import net.sf.json.JSONArray;
import net.sf.json.JSONObject;  
  



import org.activiti.engine.impl.util.json.XML;
import org.jdom.Document;  
import org.jdom.Element;  
import org.jdom.input.SAXBuilder;  
  
public class Xml2JsonUtil {  
	
	// xml解析
			/**
			 * xml解析返回json
			 */
	public static Map<String, Object> resolveAtt(String xml) {
		org.activiti.engine.impl.util.json.JSONObject json = XML.toJSONObject(xml);
		String str = parseJSON2Map(json.toString(2)).get("RECORD").toString();
		if(str != null){
			return parseJSON2Map(str);
		}
		return parseJSON2Map(json.toString(2));
	}
	
	 public static Map<String, Object> parseJSON2Map(String jsonStr){    
         Map<String, Object> map = new HashMap<String, Object>();    
         JSONObject json = JSONObject.fromObject(jsonStr);    
         for(Object k : json.keySet()){    
             Object v = json.get(k);     
             if(v instanceof JSONArray){    
                 List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();    
                 Iterator<JSONObject> it = ((JSONArray)v).iterator();    
                 while(it.hasNext()){    
                     JSONObject json2 = it.next();    
                     list.add(parseJSON2Map(json2.toString()));    
                 }    
                 map.put(k.toString(), list);    
             } else {    
                 map.put(k.toString(), v);    
             }    
         }    
         return map;    
     }  
	
    /** 
     * 转换一个xml格式的字符串到json格式 
     *  
     * @param xml 
     *            xml格式的字符串 
     * @return 成功返回json 格式的字符串;失败反回null 
     */  
    @SuppressWarnings("unchecked")  
    public static  String xml2JSON(String xml) {  
        JSONObject obj = new JSONObject();  
        try {  
        	//确认传入的xml为什么格式的编码
        	String title=xml.substring(xml.indexOf("<?xml"), xml.indexOf("?>"));
        	String encoding="UTF-8";
        	if(title.contains("UTF-8")||title.contains("utf-8")){
        		encoding="UTF-8";
        	}else if(title.contains("GBK")||title.contains("gbk")){
        		encoding="GBK";
        	}else if(title.contains("gb2312")||title.contains("GB2312")){
        		encoding="GB2312";
        	}else{
        		encoding="UTF-8";
        	}
        	 
            InputStream is = new ByteArrayInputStream(xml.getBytes(encoding));  
            SAXBuilder sb = new SAXBuilder();
            Document doc = sb.build(is);  
            Element root = doc.getRootElement();  
            obj.put(root.getName(), iterateElement(root));  
            return obj.toString();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;
    }  
  
    /** 
     * 转换一个xml格式的字符串到json格式 
     *  
     * @param file 
     *            java.io.File实例是一个有效的xml文件 
     * @return 成功反回json 格式的字符串;失败反回null 
     */  
    @SuppressWarnings("unchecked")  
    public static String xml2JSON(File file) {  
        JSONObject obj = new JSONObject();  
        try {  
            SAXBuilder sb = new SAXBuilder();  
            Document doc = sb.build(file);  
            Element root = doc.getRootElement();  
            obj.put(root.getName(), iterateElement(root));  
            return obj.toString();  
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        }  
    }  
  
    /** 
     * 一个迭代方法 
     *  
     * @param element 
     *            : org.jdom.Element 
     * @return java.util.Map 实例 
     */  
    @SuppressWarnings("unchecked")  
    private static Map  iterateElement(Element element) {  
        List jiedian = element.getChildren();  
        Element et = null;  
        Map obj = new HashMap();  
        List list = null;  
        for (int i = 0; i < jiedian.size(); i++) {  
            list = new LinkedList();  
            et = (Element) jiedian.get(i);  
            if (et.getTextTrim().equals("")) {  
                if (et.getChildren().size() == 0)  
                    continue;  
                if (obj.containsKey(et.getName())) {  
                    list = (List) obj.get(et.getName());  
                }  
                list.add(iterateElement(et));  
                obj.put(et.getName(), list);  
            } else {  
                if (obj.containsKey(et.getName())) {  
                    list = (List) obj.get(et.getName());  
                }  
                list.add(et.getTextTrim());  
                obj.put(et.getName(), list);  
            }  
        }  
        return obj;  
    }  
    
    
    
  
    // 测试  
    public static void main(String[] args) {  
        System.out.println(  Xml2JsonUtil.xml2JSON("<MapSet>"  
                + "<MapGroup id='Sheboygan'>" + "<Map>"  
                + "<Type>MapGuideddddddd</Type>"  
                + "<SingleTile>true</SingleTile>" + "<Extension>"  
                + "<ResourceId>ddd</ResourceId>" + "</Extension>" + "</Map>"  
                + "<Map>" + "<Type>ccc</Type>" + "<SingleTile>ggg</SingleTile>"  
                + "<Extension>" + "<ResourceId>aaa</ResourceId>"  
                + "</Extension>" + "</Map>" + "<Extension />" + "</MapGroup>"  
                + "<ddd>" + "33333333" + "</ddd>" + "<ddd>" + "444" + "</ddd>"  
                + "</MapSet>"));  
    }  
}  
