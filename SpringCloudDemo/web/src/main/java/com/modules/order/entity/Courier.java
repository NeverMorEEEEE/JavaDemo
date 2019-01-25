package com.modules.order.entity;

import java.io.Serializable;
import java.util.Date;

import com.util.Tools;

/**
 * 派送员表
 * @author nevermore
 *
 */
public class Courier implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String courierId;
	private String courierName;
	private String courierPhone;
	private String status;

	
	public Courier() {
		courierId = Tools.UUID();
	}


	/**
	 * @return the courierId
	 */
	public String getCourierId() {
		return courierId;
	}


	/**
	 * @param courierId the courierId to set
	 */
	public void setCourierId(String courierId) {
		this.courierId = courierId;
	}


	/**
	 * @return the courierName
	 */
	public String getCourierName() {
		return courierName;
	}


	/**
	 * @param courierName the courierName to set
	 */
	public void setCourierName(String courierName) {
		this.courierName = courierName;
	}


	/**
	 * @return the courierPhone
	 */
	public String getCourierPhone() {
		return courierPhone;
	}


	/**
	 * @param courierPhone the courierPhone to set
	 */
	public void setCourierPhone(String courierPhone) {
		this.courierPhone = courierPhone;
	}


	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}


	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}


	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder("[");
		return sb.append("courierId : " + courierId + ",courierName : " + courierName + ",courierPhone:" +courierPhone
				+",status:" +status + "]").toString();
	}
	
	
}
