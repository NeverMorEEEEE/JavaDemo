package com.ces.webservice;

public class NwServiceProxy implements com.ces.webservice.NwService {
  private String _endpoint = null;
  private com.ces.webservice.NwService nwService = null;
  
  public NwServiceProxy() {
    _initNwServiceProxy();
  }
  
  public NwServiceProxy(String endpoint) {
    _endpoint = endpoint;
    _initNwServiceProxy();
  }
  
  private void _initNwServiceProxy() {
    try {
      nwService = (new com.ces.webservice.NwServiceServiceLocator()).getNwServicePort();
      if (nwService != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)nwService)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)nwService)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (nwService != null)
      ((javax.xml.rpc.Stub)nwService)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public com.ces.webservice.NwService getNwService() {
    if (nwService == null)
      _initNwServiceProxy();
    return nwService;
  }
  
  public java.lang.String getValue(com.ces.webservice.Receive arg0) throws java.rmi.RemoteException{
    if (nwService == null)
      _initNwServiceProxy();
    return nwService.getValue(arg0);
  }
  
  public java.lang.String getDetail(com.ces.webservice.Batchdetail arg0) throws java.rmi.RemoteException{
    if (nwService == null)
      _initNwServiceProxy();
    return nwService.getDetail(arg0);
  }
  
  public java.lang.String getPeriod(com.ces.webservice.Period arg0) throws java.rmi.RemoteException{
    if (nwService == null)
      _initNwServiceProxy();
    return nwService.getPeriod(arg0);
  }
  
  public java.lang.String getBatch(com.ces.webservice.Batch arg0) throws java.rmi.RemoteException{
    if (nwService == null)
      _initNwServiceProxy();
    return nwService.getBatch(arg0);
  }
  
  public java.lang.String getDeptcode(com.ces.webservice.Deptcode arg0) throws java.rmi.RemoteException{
    if (nwService == null)
      _initNwServiceProxy();
    return nwService.getDeptcode(arg0);
  }
  
  public java.lang.String getCheckResult(java.lang.String arg0) throws java.rmi.RemoteException{
    if (nwService == null)
      _initNwServiceProxy();
    return nwService.getCheckResult(arg0);
  }
  
  
}