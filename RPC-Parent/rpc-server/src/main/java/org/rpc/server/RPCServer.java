package org.rpc.server;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.reflect.Method;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.apache.http.protocol.RequestDate;


import com.google.common.collect.Maps;

public class RPCServer {
	
	//定义存储暴露服务接口和对应实现类的映射集合
	private Map<String,Object> serviceList = Maps.newConcurrentMap();
	
	//定义一个线程池来复用
	ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(8, 30, 1000,
			TimeUnit.MILLISECONDS, new ArrayBlockingQueue<Runnable>(10));

	/**
	 * 启动RPC框架服务端
	 * @param port
	 */
	public void start(int port){
		try {
			//创建服务端socket
			ServerSocket ssocket = new ServerSocket();
			ssocket.bind(new InetSocketAddress(port));
			System.out.println("服务启动成功……");
			while(true){
				poolExecutor.execute(new ServerTask(ssocket.accept()));
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
	}
	
	/**
	 * 定义暴露的方法
	 * 
	 * <dubbo:interface class="" ref="TestApi"/>
	 * <bean id="TestApi" class="org.rpc.server.rpc.api.TestApi"/>
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 * 
	 */
	public void publicServive(Class<?> interfaceCls,Class<?> implCls) throws InstantiationException, IllegalAccessException{
		this.serviceList.put(interfaceCls.getName(), implCls.newInstance());
	}

	private class ServerTask implements Runnable{

		private final Socket client;
		
		public ServerTask(Socket client) {
			super();
			this.client = client;
		}


		@Override
		public void run() {
			// 约定
			// 使用的序列化方式: kryo,fst,hessian,jackson,protosuf,....,jdk自带序列化方式
			// 报文格式
			// 第一个  暴露接口限定名称(String)
			// 第二个  方法名称(String)
			// 第三个  参数类型列表(Object[])
			// 第三个  参数值列表(Object[])
			
			System.out.println(client.getLocalAddress());
			
			System.out.println(client.getLocalSocketAddress());
			
			// 这里可以用Netty来提高效率
			try(ObjectOutputStream serializer = new ObjectOutputStream(client.getOutputStream());
					ObjectInputStream deSerializer = new ObjectInputStream(client.getInputStream())	){
					
					String interfaceName = deSerializer.readUTF();
					String methodName = deSerializer.readUTF();
					Class<?>[] parameterTypes = (Class<?>[])deSerializer.readObject();
					Object[] parameters = (Object[])deSerializer.readObject();
					
					// 通过服务列表去查询暴露的接口对应的实例
					Object instance = serviceList.get(interfaceName);
					if(instance == null){
						throw new RuntimeException("调用的服务接口:" + interfaceName + "不存在对应的服务实例" );
					}
					
					// 创建对应方法对象
					Method method = instance.getClass().getDeclaredMethod(methodName, parameterTypes);
					
					// 通过反射来调用实例中的方法
					Object result = method.invoke(instance, parameters);
					
					// 将返回的结果进行序列化
					serializer.writeObject(result);
					
				}catch (Exception e) {
				// TODO: handle exception
			}
		}
		
	}
	
	public static void main(String[] args) {
		
	}

}
