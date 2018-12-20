/**
 * NwServiceServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.ces.webservice;

public class NwServiceServiceLocator extends org.apache.axis.client.Service implements com.ces.webservice.NwServiceService {

    public NwServiceServiceLocator() {
    }


    public NwServiceServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public NwServiceServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for NwServicePort
    private java.lang.String NwServicePort_address = "http://59.202.34.221:8080/zjservice/ws/nwservice";

    public java.lang.String getNwServicePortAddress() {
        return NwServicePort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String NwServicePortWSDDServiceName = "NwServicePort";

    public java.lang.String getNwServicePortWSDDServiceName() {
        return NwServicePortWSDDServiceName;
    }

    public void setNwServicePortWSDDServiceName(java.lang.String name) {
        NwServicePortWSDDServiceName = name;
    }

    public com.ces.webservice.NwService getNwServicePort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(NwServicePort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getNwServicePort(endpoint);
    }

    public com.ces.webservice.NwService getNwServicePort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.ces.webservice.NwServiceServiceSoapBindingStub _stub = new com.ces.webservice.NwServiceServiceSoapBindingStub(portAddress, this);
            _stub.setPortName(getNwServicePortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setNwServicePortEndpointAddress(java.lang.String address) {
        NwServicePort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.ces.webservice.NwService.class.isAssignableFrom(serviceEndpointInterface)) {
                com.ces.webservice.NwServiceServiceSoapBindingStub _stub = new com.ces.webservice.NwServiceServiceSoapBindingStub(new java.net.URL(NwServicePort_address), this);
                _stub.setPortName(getNwServicePortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("NwServicePort".equals(inputPortName)) {
            return getNwServicePort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://webservice.ces.com/", "NwServiceService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://webservice.ces.com/", "NwServicePort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("NwServicePort".equals(portName)) {
            setNwServicePortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
