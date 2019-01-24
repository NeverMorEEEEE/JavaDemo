package wac.toy;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.axis.utils.ByteArray;

import com.mchange.lang.ByteUtils;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class MMLock {
	/**    * MD5加密16位    * @param encryptStr 要加密数据    * @return 返回16位加密结果    * ZhaoLi    */ 
	public static String md5Encrypt16(String encryptStr)   
	{     
		return md5Encrypt32(encryptStr).substring(8, 24);   
	}     
	/**    * MD5加密32位    * @param encryptStr 要加密数据    * @return 32位加密结果    * ZhaoLi    */  
	public static String md5Encrypt32(String encryptStr){     
		MessageDigest md5;     
		try    {       md5 = MessageDigest.getInstance("MD5");       
		byte[] md5Bytes = md5.digest(encryptStr.getBytes());       
		StringBuffer hexValue = new StringBuffer();      
		for (int i = 0; i < md5Bytes.length; i++){         
			int val = (md5Bytes[i]) & 0xff;         
			if (val < 16){          
				hexValue.append("0");        
			}         
			hexValue.append(Integer.toHexString(val));       
		}       return hexValue.toString().toLowerCase();     
		} catch (Exception e){       
			throw new RuntimeException(e);     
		}  
	}     
	/**     
	 * 
	 * * 结合base64实现md5加密     
	 * * @param msg 待加密字符串   
	 * @return 获取md5后转为base64     
	 * * @throws Exception     
	 * */ 
	public static String md5EncryptBase64(String msg) throws Exception{     
		return msg == null ? null : base64Encode(md5(msg));   
	}     /**    
	 * 将byte[]转为各种进制的字符串     
	 * * @param bytes byte[]     
	 * * @param radix 可以转换进制的范围，从Character.MIN_RADIX到Character.MAX_RADIX，超出范围后变为10进制     
	 * * @return 转换后的字符串     */  
	public static String binary(byte[] bytes, int radix){    
		return new BigInteger(1, bytes).toString(radix);// 这里的1代表正数   
	}    
	/**     * base 64 encode     
	 * * @param bytes 待编码的byte[]    
	 *  * @return 编码后的base 64 code     */  
	public static String base64Encode(byte[] bytes) {     
		return new BASE64Encoder().encode(bytes);  
	}     

	/**     
	 * * base 64 decode     
	 * * @param base64Code 待解码的base 64 code    
	 *  * @return 解码后的byte[]     
	 *  * @throws Exception     */ 

	public static byte[] base64Decode(String base64Code){     
		try   
		{       
			return base64Code == null ? null : new BASE64Decoder().decodeBuffer(base64Code);     
		} catch (IOException e){      
			throw new RuntimeException("报错内容", e);    
		}   
	} 

	/**     * 获取byte[]的md5值    
	 *  * @param bytes byte[]     
	 * * @return md5     
	 * * @throws Exception     */  
	public static byte[] md5(byte[] bytes)   {
		MessageDigest md;     
		try{
			md = MessageDigest.getInstance("MD5");     
		} catch (NoSuchAlgorithmException e)     {  
			throw new RuntimeException("报错内容", e);     
		}     md.update(bytes);    
		return md.digest();   
	}     

	/**     * 获取字符串md5值     
	 * * @param msg     
	 * * @return md5     
	 * * @throws Exception     */  
	public static byte[] md5(String msg){    
		return msg == null ? null : md5(msg.getBytes());  
	} 



	public static void main(String[] args) {
		String str = "ZTM0NWFmNTVhOTQ0YzAxZGE1ZDJmZGI0OTg1NzY0OTR2QVBScUdNWQ==";
		
//		System.out.println(md5Encrypt16(""));
//		System.out.println(md5Encrypt16("需要进行MD5加密的字符串")); 
		try {
//			System.out.println(md5EncryptBase64("需要进行MD5加密的字符串"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		String beta = "abcdef";
		String bb = new BASE64Encoder().encode(beta.getBytes());
		byte[] bt  = base64Decode(beta);
		System.out.println(new String(bt));
		System.out.println(bb);
		
		byte[] bmd5 = md5(bb);
		
		System.out.println(bmd5.toString());
		System.out.println(ByteUtils.toHexAscii(bmd5));
		System.out.println(com.opslab.util.ByteUtils.bytesToHexFun1(bmd5));
		System.out.println(com.opslab.util.ByteUtils.bytesToHexFun2(bmd5));
		System.out.println(com.opslab.util.ByteUtils.bytesToHexFun3(bmd5));
		
		
		
	}

}
