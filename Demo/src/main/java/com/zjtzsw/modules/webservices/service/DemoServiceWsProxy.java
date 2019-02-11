package com.zjtzsw.modules.webservices.service;

public class DemoServiceWsProxy implements com.zjtzsw.modules.webservices.service.DemoServiceWs_PortType {
    private String _endpoint = null;
    private com.zjtzsw.modules.webservices.service.DemoServiceWs_PortType demoServiceWs_PortType = null;

    public DemoServiceWsProxy() {
        _initDemoServiceWsProxy();
    }

    public DemoServiceWsProxy(String endpoint) {
        _endpoint = endpoint;
        _initDemoServiceWsProxy();
    }

    private void _initDemoServiceWsProxy() {
        try {
            demoServiceWs_PortType = (new com.zjtzsw.modules.webservices.service.DemoServiceWs_ServiceLocator()).getDemoServiceWsImplPort();
            if (demoServiceWs_PortType != null) {
                if (_endpoint != null)
                    ((javax.xml.rpc.Stub) demoServiceWs_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
                else
                    _endpoint = (String) ((javax.xml.rpc.Stub) demoServiceWs_PortType)._getProperty("javax.xml.rpc.service.endpoint.address");
            }

        } catch (javax.xml.rpc.ServiceException serviceException) {
        }
    }

    public String getEndpoint() {
        return _endpoint;
    }

    public void setEndpoint(String endpoint) {
        _endpoint = endpoint;
        if (demoServiceWs_PortType != null)
            ((javax.xml.rpc.Stub) demoServiceWs_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);

    }

    public com.zjtzsw.modules.webservices.service.DemoServiceWs_PortType getDemoServiceWs_PortType() {
        if (demoServiceWs_PortType == null)
            _initDemoServiceWsProxy();
        return demoServiceWs_PortType;
    }

    public java.lang.String getBanjInfo(java.lang.String jsonObj) throws java.rmi.RemoteException {
        if (demoServiceWs_PortType == null)
            _initDemoServiceWsProxy();
        return demoServiceWs_PortType.getBanjInfo(jsonObj);
    }


}