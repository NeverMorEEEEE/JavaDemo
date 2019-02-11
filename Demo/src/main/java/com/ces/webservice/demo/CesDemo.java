package com.ces.webservice.demo;

import java.rmi.RemoteException;

import com.ces.webservice.Deptcode;
import com.ces.webservice.NwService;
import com.ces.webservice.NwServiceProxy;

public class CesDemo {

    public static void main(String[] args) {
        NwService nws = new NwServiceProxy();

        Deptcode dept = new Deptcode();
        dept.setBmbm("16");
        dept.setBmmc("丽水人力社保局");
        dept.setQzqc("J115");

        String result = "";
        try {
            result = nws.getDeptcode(dept);
        } catch (RemoteException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("result : " + result);
    }
}
