/**
 * NwService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.ces.webservice;

public interface NwService extends java.rmi.Remote {
    public java.lang.String getValue(com.ces.webservice.Receive arg0) throws java.rmi.RemoteException;
    public java.lang.String getDetail(com.ces.webservice.Batchdetail arg0) throws java.rmi.RemoteException;
    public java.lang.String getPeriod(com.ces.webservice.Period arg0) throws java.rmi.RemoteException;
    public java.lang.String getBatch(com.ces.webservice.Batch arg0) throws java.rmi.RemoteException;
    public java.lang.String getDeptcode(com.ces.webservice.Deptcode arg0) throws java.rmi.RemoteException;
    public java.lang.String getCheckResult(java.lang.String arg0) throws java.rmi.RemoteException;
}
