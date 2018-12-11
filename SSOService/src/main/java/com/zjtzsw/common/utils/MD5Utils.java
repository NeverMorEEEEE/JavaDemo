package com.zjtzsw.common.utils;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * md5 工具类
 * @author hhj
 *
 */
public class MD5Utils {
	private static String CLIENT_SALT = "1ut815h171rg";
	
    /**
     * MD5加密 生成32位md5码
     * @param str
     * @return
     */
    public static String md5Encode(String str){
        try {
            MessageDigest md5 = MessageDigest.getInstance("md5");
            byte[] byteArray = str.getBytes(Charset.forName("utf-8"));
            byte[] md5Bytes = md5.digest(byteArray);
            StringBuffer hexValue = new StringBuffer();
            for (int i = 0; i < md5Bytes.length; i++) {
                int val = ((int) md5Bytes[i]) & 0xff;
                if (val < 16) {
                    hexValue.append("0");
                }
                hexValue.append(Integer.toHexString(val));
            }
            return hexValue.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
        
    }
    
    
    /**
     * 将客户端输入密码加上固定盐值生成第一层密码
     * @param ClientPass
     * @param salt
     * @return
     */
    private static String convertClientPass(String inputPass){
    	String temp = "" + CLIENT_SALT.charAt(0) + CLIENT_SALT.charAt(2) +  inputPass  + CLIENT_SALT.charAt(5);
    	
		return md5Encode(temp);
    	
    }
    
    
    /**
     * 将第一层密码加上用户的特殊盐值生成用户密码
     * @param ClientPass
     * @param salt
     * @return
     */
    private static String convertDbPass(String ClientPass,String salt){
    	String temp = "" + salt.charAt(0) + salt.charAt(2) +  ClientPass  + salt.charAt(5);
		return md5Encode(temp);
    }
    
    /**
     * 将用户输入的密码转换成数据库存储的密码
     * @param inputPass
     * @param salt
     * @return
     */
    public static String convertInputPass2DbPass(String inputPass,String salt){
    	
    	return convertDbPass(convertClientPass(inputPass),salt);
    }
    
}
