package com.zjtzsw.modules.sys.result;

public class CodeMsg {
	
	private int code;
	private String msg;
	
	public static CodeMsg SUCCESS = new CodeMsg(0,"success");
	public static CodeMsg SESSION_ERROR = new CodeMsg(500100,"sessio不存在或者失效");
	public static CodeMsg PASSWORD_EMPTY = new CodeMsg(500211,"登录密码不能为空");
	public static CodeMsg PASSWORD_ERROR = new CodeMsg(500212,"密码错误");
	public static CodeMsg ACCOUNT_ERROR = new CodeMsg(500311,"登录账号有误");
	public static CodeMsg ACCOUNT_EMPTY = new CodeMsg(500310,"账号不能为空");
	
	public CodeMsg(int code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	}


	public int getCode() {
		return code;
	}


	public void setCode(int code) {
		this.code = code;
	}


	public String getMsg() {
		return msg;
	}


	public void setMsg(String msg) {
		this.msg = msg;
	}


	@Override
	public String toString() {
		return "CodeMsg [code=" + code + ", msg=" + msg + "]";
	}
	
	

}
