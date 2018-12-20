package wac.utils;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

public class StringUtils
{
  public StringUtils() {}
  
  public static boolean isBlank(String str)
  {
    return (str == null) || ("".equals(str.trim()));
  }
  
  public static boolean isNotBlank(String str)
  {
    return !isBlank(str);
  }
  
  public static boolean areBlank(String... strs)
  {
    String[] arrayOfString = strs;
    int j = strs.length;
    for (int i = 0; i < j; i++)
    {
      String str = arrayOfString[i];
      if (isNotBlank(str)) {
        return false;
      }
    }
    return true;
  }
  
  public static boolean areNotBlank(String... strs)
  {
    String[] arrayOfString = strs;
    int j = strs.length;
    for (int i = 0; i < j; i++)
    {
      String str = arrayOfString[i];
      if (isBlank(str)) {
        return false;
      }
    }
    return true;
  }
  
//  public static String encode(String str, int times)
//  {
//    if (isBlank(str)) {
//      return null;
//    }
//    try
//    {
//      for (int i = 0; i < times; i++) {
//        str = URLEncoder.encode(str, EhancedSSOConfig.getSSOEncoding());
//      }
//    }
//    catch (UnsupportedEncodingException e)
//    {
//      e.printStackTrace();
//    }
//    return str;
//  }
  
//  public static String encode(String str)
//  {
//    return encode(str, 1);
//  }
//  
//  public static String decode(String str, int times)
//  {
//    if (isBlank(str)) {
//      return null;
//    }
//    try
//    {
//      for (int i = 0; i < times; i++) {
//        str = URLDecoder.decode(str, EhancedSSOConfig.getSSOEncoding());
//      }
//    }
//    catch (UnsupportedEncodingException e)
//    {
//      e.printStackTrace();
//    }
//    return str;
//  }
  
//  public static String decode(String str)
//  {
//    return decode(str, 1);
//  }
}

/* Location:           D:\m2_yth\repository\com\zjtzsw\tzsso\sso\1.6\sso-1.6.jar
 * Qualified Name:     com.zjtzsw.tzsso.util.StringUtils
 * Java Class Version: 5 (49.0)
 * JD-Core Version:    0.7.0.1
 */