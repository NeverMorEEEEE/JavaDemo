package com.zjtzsw.modules.sys.vo;

public class LoginVo {
	private String account;
	private String name;
	private String password;
	
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return "LoginVo [account=" + account + ",name: "+ name + ", password=" + password + "]";
	}
	
	
	
	
}
