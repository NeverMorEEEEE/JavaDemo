/**
 * DemoServiceWs_ServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.zjtzsw.modules.webservices.service;

public class DemoServiceWs_ServiceLocator extends org.apache.axis.client.Service implements com.zjtzsw.modules.webservices.service.DemoServiceWs_Service {

    public DemoServiceWs_ServiceLocator() {
    }


    public DemoServiceWs_ServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public DemoServiceWs_ServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for DemoServiceWsImplPort
    private java.lang.String DemoServiceWsImplPort_address = "http://127.0.0.1:8090/ws/demoService";

    public java.lang.String getDemoServiceWsImplPortAddress() {
        return DemoServiceWsImplPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String DemoServiceWsImplPortWSDDServiceName = "DemoServiceWsImplPort";

    public java.lang.String getDemoServiceWsImplPortWSDDServiceName() {
        return DemoServiceWsImplPortWSDDServiceName;
    }

    public void setDemoServiceWsImplPortWSDDServiceName(java.lang.String name) {
        DemoServiceWsImplPortWSDDServiceName = name;
    }

    public com.zjtzsw.modules.webservices.service.DemoServiceWs_PortType getDemoServiceWsImplPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(DemoServiceWsImplPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getDemoServiceWsImplPort(endpoint);
    }

    public com.zjtzsw.modules.webservices.service.DemoServiceWs_PortType getDemoServiceWsImplPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.zjtzsw.modules.webservices.service.DemoServiceWsSoapBindingStub _stub = new com.zjtzsw.modules.webservices.service.DemoServiceWsSoapBindingStub(portAddress, this);
            _stub.setPortName(getDemoServiceWsImplPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setDemoServiceWsImplPortEndpointAddress(java.lang.String address) {
        DemoServiceWsImplPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.zjtzsw.modules.webservices.service.DemoServiceWs_PortType.class.isAssignableFrom(serviceEndpointInterface)) {
                com.zjtzsw.modules.webservices.service.DemoServiceWsSoapBindingStub _stub = new com.zjtzsw.modules.webservices.service.DemoServiceWsSoapBindingStub(new java.net.URL(DemoServiceWsImplPort_address), this);
                _stub.setPortName(getDemoServiceWsImplPortWSDDServiceName());
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
        if ("DemoServiceWsImplPort".equals(inputPortName)) {
            return getDemoServiceWsImplPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://service.webservices.modules.zjtzsw.com", "DemoServiceWs");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://service.webservices.modules.zjtzsw.com", "DemoServiceWsImplPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("DemoServiceWsImplPort".equals(portName)) {
            setDemoServiceWsImplPortEndpointAddress(address);
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
