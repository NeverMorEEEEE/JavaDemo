package com.zjtzsw.common.exception;

import com.zjtzsw.modules.sys.result.CodeMsg;

/**
 * 自定义异常
 * 
 * @author hhj
 * @date 2017年9月16日 上午9:37:27
 */
public class WacException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
    private String msg;
    private int code = 500;
    
    
    
    
    public WacException(CodeMsg msg) {
		super(msg.getMsg());
		this.msg = msg.getMsg();
		this.code = msg.getCode();
	}
    
    public WacException(String msg) {
		super(msg);
		this.msg = msg;
	}
    
	
	public WacException(String msg, Throwable e) {
		super(msg, e);
		this.msg = msg;
	}
	
	public WacException(String msg, int code) {
		super(msg);
		this.msg = msg;
		this.code = code;
	}
	
	public WacException(String msg, int code, Throwable e) {
		super(msg, e);
		this.msg = msg;
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
	
	
}
