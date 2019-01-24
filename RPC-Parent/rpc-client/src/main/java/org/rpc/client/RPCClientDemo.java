package org.rpc.client;

import java.net.InetAddress;
import java.net.InetSocketAddress;

import org.rpc.client.rpc.RpcClient;
import org.user.server.service.UserService;
import org.user.server.service.impl.UserServiceImpl;

/**
 * Hello world!
 *
 */
public class RPCClientDemo 
{
    public static void main( String[] args )
    {
    	UserService userService = RpcClient.getRemoteProxy(UserService.class, new InetSocketAddress("127.0.0.1", 8088));
    	System.out.println(userService.addUser("wac的RPC测试"));
    }
}
