package com.zjtzsw.modules.sys.domain.DAO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.alibaba.fastjson.JSONObject;

/**
 * 用户实体类
 *
 * @author 杨高超
 * @since 2018-03-12
 */
@Entity
@Table(name = "T_USER")
public class UserDO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userid;
	@Column(length = 50)
	private String username;
	@Column(length = 50)
	private String useraccount;
	@Column(length = 250)
	private String userpass;
	@Column(length = 50)
	private String salt;
	public Long getUserId() {
		return userid;
	}
	public void setUserId(Long userId) {
		this.userid = userId;
	}
	public String getUserName() {
		return username;
	}
	public void setUserName(String userName) {
		this.username = userName;
	}
	public String getUserAccount() {
		return useraccount;
	}
	public void setUserAccount(String userAccount) {
		this.useraccount = userAccount;
	}
	public String getUserPass() {
		return userpass;
	}
	public void setUserPass(String userPass) {
		this.userpass = userPass;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String toViewString() {
		return "User[userId:" + userid + ",userName:" + username + ",userAccount:" + useraccount + "]";
	}
	
	
	
	public String toString() {
		return JSONObject.toJSONString(this);
//		return "User[userId:" + userid + ",userName:" + username + ",userAccount:" + useraccount + 
//				"userPass:" + userpass + ",salt:" + salt + "]";
		
		
	}
}