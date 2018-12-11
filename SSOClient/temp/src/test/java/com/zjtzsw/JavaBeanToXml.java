package com.zjtzsw;

import java.io.IOException;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.zjtzsw.modules.api.model.AutoDiv;
import com.zjtzsw.modules.api.model.AutoRow;
import com.zjtzsw.modules.api.model.AutoTable;
import com.zjtzsw.modules.api.model.BaseInfo;
import com.zjtzsw.modules.api.model.CallInfo;
import com.zjtzsw.modules.api.model.FormInfo;
import com.zjtzsw.modules.api.model.FormRecords;
import com.zjtzsw.modules.api.model.Item;

public class JavaBeanToXml {
    
    
    public static void main(String[] args) throws IOException {
        BaseInfo baseInfo = new BaseInfo();
        CallInfo callInfo = new CallInfo();
        callInfo.setAppKey("aaaaaaaaaaaaa");
        baseInfo.setCallInfo(callInfo);
        baseInfo.setProjid("111111111111");
        XmlMapper xml = new XmlMapper();
        System.out.println(xml.writeValueAsString(baseInfo));
        BaseInfo baseInfo2 = xml.readValue(xml.writeValueAsString(baseInfo), BaseInfo.class);
        System.out.println(baseInfo2.getProjid());
        System.out.println(baseInfo2.getCallInfo().getAppKey());
        
        
        
        FormInfo formInfo = new FormInfo("测试");
        formInfo.addItem(new Item("item01", "字段01", "值"));
        formInfo.addItem(new Item("item01", "字段01", "值"));
        
        AutoTable autoTable = new AutoTable("动态表格01");
        autoTable.addAutoRow(new AutoRow().addItem(new Item("item01", "字段01", "值")));
        formInfo.addAutoTable(autoTable);
        formInfo.addAutoTable(autoTable);
        
        AutoDiv autoDiv = new AutoDiv("动态区域01");
        autoDiv.addItems(new Item("item01", "字段01", "值"));
        autoDiv.addAutoTable(autoTable);
        formInfo.addAutoDiv(autoDiv);
        formInfo.addAutoDiv(autoDiv);
        
        System.out.println(xml.writeValueAsString(new FormRecords().addFormInfo(formInfo)));
    }
    

}
