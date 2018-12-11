package com.zjtzsw.common.validator;

import org.apache.commons.lang.StringUtils;

import com.zjtzsw.common.exception.TZException;

/**
 * 数据校验
 * @author hhj
 * @date 2017-03-23 15:50
 */
public abstract class Assert {

    public static void isBlank(String str, String message) {
        if (StringUtils.isBlank(str)) {
            throw new TZException(message);
        }
    }

    public static void isNull(Object object, String message) {
        if (object == null) {
            throw new TZException(message);
        }
    }
}
