/**
 * NwServiceService.java
 * <p>
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.ces.webservice;

public interface NwServiceService extends javax.xml.rpc.Service {
    public java.lang.String getNwServicePortAddress();

    public com.ces.webservice.NwService getNwServicePort() throws javax.xml.rpc.ServiceException;

    public com.ces.webservice.NwService getNwServicePort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
