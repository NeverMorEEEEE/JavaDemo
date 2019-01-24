package org.rpc.client.rpc;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.net.InetSocketAddress;
import java.net.Socket;

import org.apache.http.protocol.RequestDate;

import com.alibaba.dubbo.remoting.exchange.Request;

public class RpcClient {

	
	@SuppressWarnings("unchecked")
	public static <T> T getRemoteProxy(final Class<T> interfaceClass,final InetSocketAddress address){
		return (T)Proxy.newProxyInstance(interfaceClass.getClassLoader(), new Class<?>[]{interfaceClass},
				new InvocationHandler() {
					
					@Override
					public Object invoke(Object proxy, Method method, Object[] args)
							throws Throwable {
						//客户端负载均衡（从注册列表中获取所有服务列表中的IP:port）
						
						try(Socket socket = new Socket()){
							socket.connect(address);
							try(ObjectOutputStream serializer = new ObjectOutputStream(socket.getOutputStream());
								ObjectInputStream deSerializer = new ObjectInputStream(socket.getInputStream())	){
								
								// 序列化放入到流中
								serializer.writeUTF(interfaceClass.getName());
								serializer.writeUTF(method.getName());
								serializer.writeObject(method.getParameterTypes());
								serializer.writeObject(args);
								
								return deSerializer.readObject();
								
//								RequestDate dataPacket = new RequestDate();
//								dataPacket.se
//								
//								
//								serializer.writeObject(obj);
							}
							
						} catch (Exception e) {
							// TODO: handle exception
						}
						
						return null;
					}
				});
		
	}
}
