package com.zjtzsw.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.zjtzsw.common.exception.TZException;
import com.zjtzsw.common.utils.R;

/**
 * controller 增强器
 *
 * @author hhj
 */
@RestControllerAdvice
public class TZExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(getClass());
    
    /**
     * 自定义异常
     */
    @ExceptionHandler(TZException.class)
    public R handleTZException(TZException e){
        R r = new R(false);
        r.put("code", e.getCode());
        r.put("msg", e.getMessage());
        return r;
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public R handleDuplicateKeyException(DuplicateKeyException e){
        logger.error(e.getMessage(), e);
        return R.error("数据库中已存在该记录");
    }

    @ExceptionHandler(Exception.class)
    public R handleException(Exception e){
    	 System.out.println("TZExceptionHandler.handleException()");
        logger.error(e.getMessage(), e);
        return R.error();
    }
}
