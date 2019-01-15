package com.zjtzsw.common.xss;

import org.apache.commons.lang.StringUtils;

import com.zjtzsw.common.exception.TZException;

/**
 * 
 * <p>SQL过滤</p>
 * @author hhj
 * @date 2017年9月16日 上午8:52:50
 */
public class SQLFilter {

    /**
     * SQL注入过滤
     * @param str  待验证的字符串
     */
    public static String sqlInject(String str){
        if(StringUtils.isBlank(str)){
            return null;
        }
        //去掉'|"|;|\字符
        str = StringUtils.replace(str, "'", "");
        str = StringUtils.replace(str, "\"", "");
        str = StringUtils.replace(str, ";", "");
        str = StringUtils.replace(str, "\\", "");

        //转换成小写
        str = str.toLowerCase();

        //非法字符
        String[] keywords = {"master", "truncate", "insert", "select", "delete", "update", "declare", "alert", "drop"};

        //判断是否包含非法字符
        for(String keyword : keywords){
            if(str.indexOf(keyword) != -1){
                throw new TZException("包含非法字符");
            }
        }

        return str;
    }
}
