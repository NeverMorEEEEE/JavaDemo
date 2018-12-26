package com.zjtzsw.modules.order.controller.entity;

import java.io.Serializable;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;

public class OrderEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String orderid;// 订单ID
	private String consumerid;// 用户ID
	private String consumername;// 用户姓名
	private String consumerphone;// 用户电话
	private String deliveraddress;//派送地址
	private String createtime;//订单创建时间
	private String remarks;		//备注
	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public String getConsumerid() {
		return consumerid;
	}
	public void setConsumerid(String consumerid) {
		this.consumerid = consumerid;
	}
	public String getConsumername() {
		return consumername;
	}
	public void setConsumername(String consumername) {
		this.consumername = consumername;
	}
	public String getConsumerphone() {
		return consumerphone;
	}
	public void setConsumerphone(String consumerphone) {
		this.consumerphone = consumerphone;
	}
	public String getDeliveraddress() {
		return deliveraddress;
	}
	public void setDeliveraddress(String deliveraddress) {
		this.deliveraddress = deliveraddress;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder("[");
		sb.append("orderid : " + orderid + ",consumerid : " + consumerid + ",consumername : " + consumerid + ","
				+ "consumername : " + consumername + ",consumerphone : " + consumername + ",deliveraddress : "
				+ ",createtime : " + createtime + ",remarks : " + remarks );
		
		return sb.toString();
	}
	
	public Object toJSON(){
		return JSON.toJSON(this);
		
	}
	
	

}
