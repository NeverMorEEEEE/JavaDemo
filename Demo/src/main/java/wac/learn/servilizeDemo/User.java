package wac.learn.servilizeDemo;

import java.io.Serializable;

public class User implements Serializable{
	private static final long serialVersionUID = 1L;  
	public static String userName; 
	public String userMsg;
	public final String nation = "China";
	private transient String passwd;
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public User(String userMsg, String passwd) {
		super();
		this.userMsg = userMsg;
		this.passwd = passwd;
	}


	public static String getUserName() {
		return userName;
	}
	public static void setUserName(String userName) {
		User.userName = userName;
	}
	public String getUserMsg() {
		return userMsg;
	}
	public void setUserMsg(String userMsg) {
		this.userMsg = userMsg;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}


	@Override
	public String toString() {
		return "User [userName="  + userName + ", userMsg=" + userMsg + ", passwd=" + passwd + "]";
	}


/*	@Override
	public String toString() {
		return "User [userMsg=" + userMsg + ", passwd=" + passwd + "]";
	}*/
	
	
}