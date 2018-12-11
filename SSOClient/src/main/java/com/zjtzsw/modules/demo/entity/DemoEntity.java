package com.zjtzsw.modules.demo.entity;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 数据字典
 * @author wac
 *
 */
public class DemoEntity implements Serializable {
    private static final long serialVersionUID = -4323571331722824202L;
    private String id;//代码类别
    private String name;//类别名称

   
    public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public static long getSerialversionuid() {
        return serialVersionUID;
    }

}
