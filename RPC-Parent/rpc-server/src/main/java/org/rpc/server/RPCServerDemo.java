package org.rpc.server;

import org.user.server.service.UserService;
import org.user.server.service.impl.UserServiceImpl;

/**
 * Hello world!
 *
 */
public class RPCServerDemo 
{
    public static void main( String[] args ) throws InstantiationException, IllegalAccessException
    {
        RPCServer rpcServer = new RPCServer();
        rpcServer.publicServive(UserService.class, UserServiceImpl.class);
        rpcServer.start(8088);
        
    }
}
