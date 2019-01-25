package com.modules.order.entity;

import java.io.Serializable;

/**
 * 订单表
 * @author nevermore
 *
 */
public class Order implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String orderId;
	private String consumerName;
	private String consumerPhone;
	private String consumerId;
	private String consumerAddress;
	private String consumerAd;
	private String actualPayDiscount;
	private String payBeforeDiscount;
	private String discountAmount;
	private String discountId;
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getConsumerName() {
		return consumerName;
	}
	public void setConsumerName(String consumerName) {
		this.consumerName = consumerName;
	}
	public String getConsumerPhone() {
		return consumerPhone;
	}
	public void setConsumerPhone(String consumerPhone) {
		this.consumerPhone = consumerPhone;
	}
	public String getConsumerId() {
		return consumerId;
	}
	public void setConsumerId(String consumerId) {
		this.consumerId = consumerId;
	}
	public String getActualPayDiscount() {
		return actualPayDiscount;
	}
	public void setActualPayDiscount(String actualPayDiscount) {
		this.actualPayDiscount = actualPayDiscount;
	}
	public String getPayBeforeDiscount() {
		return payBeforeDiscount;
	}
	public void setPayBeforeDiscount(String payBeforeDiscount) {
		this.payBeforeDiscount = payBeforeDiscount;
	}
	public String getDiscountAmount() {
		return discountAmount;
	}
	public void setDiscountAmount(String discountAmount) {
		this.discountAmount = discountAmount;
	}
	public String getDiscountId() {
		return discountId;
	}
	public void setDiscountId(String discountId) {
		this.discountId = discountId;
	}
	
	
	public String getConsumerAddress() {
		return consumerAddress;
	}
	public void setConsumerAddress(String consumerAddress) {
		this.consumerAddress = consumerAddress;
	}
	public String getConsumerAd() {
		return consumerAd;
	}
	public void setConsumerAd(String consumerAd) {
		this.consumerAd = consumerAd;
	}
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder("[");
		return sb.append("consumerName : " + consumerName + ",consumerPhone : "+consumerPhone +",consumerId :" +
				consumerId +",consumerAddress : " +consumerAddress + "]").toString();
	}
	
	
}
