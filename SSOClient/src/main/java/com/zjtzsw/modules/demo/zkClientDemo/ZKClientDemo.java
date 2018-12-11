package com.zjtzsw.modules.demo.zkClientDemo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.I0Itec.zkclient.ZkClient;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.Watcher.Event.EventType;
import org.apache.zookeeper.ZooKeeper;

public class ZKClientDemo {



	public static void getChildren(ZkClient zc,String path){
		List<String>list = zc.getChildren(path);

		Iterator<String> it = list.iterator();
		while (it.hasNext()) {

			String str = (String)it.next();
			System.out.println("返回provider信息："+str);
			if(zc.exists(path+"/" +str)){
				getChildren(zc, path+"/" +str);
			}
			break;
		}
	}

	private volatile List<String> servers = null;
	private ZooKeeper zk = null;

	// 获取zk连接
	private void getZkClient() throws Exception {

		// 服务器在需求中并不需要做任何监听
		zk = new ZooKeeper("127.0.0.1:2181",5000, new Watcher() {

			@Override
			public void process(WatchedEvent event) {

				if (event.getType() == EventType.None)
					return;

				try {
					// 获取新的服务器列表,重新注册监听
					updateServers();

				} catch (Exception e) {

					e.printStackTrace();
				}

			}
		});

	}


	/**
	 * 从zk中获取在线服务器信息
	 */
	public void updateServers() throws Exception {

		// 从servers父节点下获取到所有子节点，并注册监听
		List<String> children = zk.getChildren("/dubbo",
				true);

		ArrayList<String> serverList = new ArrayList<String>();

		List<String> list = zk.getChildren("/dubbo/com.zjtzsw.modules.sys.service.LoginService", true);
		for (String child : list) {
			try{
				System.out.println("Path : " + "/dubbo/com.zjtzsw.modules.sys.service.LoginService" + "/" + child);
				byte[] data = zk.getData("/dubbo/com.zjtzsw.modules.sys.service.LoginService" + "/"
						+ child, false, null);
				

				serverList.add(new String(data));
			}catch(Exception e){
				e.printStackTrace();
			}
				
			
		}

		// 如果客户端是一个多线程程序，而且各个线程都会竞争访问servers列表，所以，在成员中用volatile修饰了一个servers变量
		// 而在更新服务器信息的这个方法中，是用一个临时List变量来进行更新
		servers = serverList;

		// 将更新之后的服务器列表信息打印在控制台观察一下
		for (String server : serverList) {

			System.out.println(server);
		}
		System.out.println("===================");

	}

	/**
	 * 业务逻辑
	 * 
	 * @throws InterruptedException
	 */
	private void requestService() throws InterruptedException {
		Thread.sleep(Long.MAX_VALUE);

	}

	public static void main(String[] args) throws Exception {
		//		ZkClient zc = new ZkClient("127.0.0.1:2181", 5000);
		//		getChildren(zc,"/dubbo");
		// 先构造一个zk的连接
		ZKClientDemo client = new ZKClientDemo();
		client.getZkClient();

		// 获取服务器列表
		client.updateServers();

		// 客户端进入业务流程，请求服务器的服务
		client.requestService();
	}
}
