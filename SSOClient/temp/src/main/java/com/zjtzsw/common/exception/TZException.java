package com.zjtzsw.common.exception;

/**
 * 自定义异常
 * 
 * @author hhj
 * @date 2017年9月16日 上午9:37:27
 */
public class TZException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
    private String msg;
    private int code = 500;
    
    public TZException(String msg) {
		super(msg);
		this.msg = msg;
	}
	
	public TZException(String msg, Throwable e) {
		super(msg, e);
		this.msg = msg;
	}
	
	public TZException(String msg, int code) {
		super(msg);
		this.msg = msg;
		this.code = code;
	}
	
	public TZException(String msg, int code, Throwable e) {
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
