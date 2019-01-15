package com.zjtzsw.modules.socketService;

import com.zjtzsw.modules.socketService.handler.CustomTextFrameHandler;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpRequestDecoder;
import io.netty.handler.codec.http.HttpResponseEncoder;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;



public class WacWebSocketSerivce {
    public void run(int port) throws Exception {  
        EventLoopGroup bossGroup = new NioEventLoopGroup();  
        EventLoopGroup workerGroup = new NioEventLoopGroup();  
        try {  
            final ServerBootstrap sb = new ServerBootstrap();  
            sb.group(bossGroup, workerGroup)  
             .channel(NioServerSocketChannel.class)  
             .childHandler(new ChannelInitializer<SocketChannel>() {  
                @Override  
                public void initChannel(final SocketChannel ch) throws Exception {  
                    ch.pipeline().addLast(  
                        new HttpResponseEncoder(),  
                        new HttpRequestDecoder(),  
                        new HttpObjectAggregator(65536),  
                        new WebSocketServerProtocolHandler("/ws"),  
                        new CustomTextFrameHandler());  
                }  
            }).option(ChannelOption.SO_BACKLOG, 65536)           
            .childOption(ChannelOption.SO_KEEPALIVE, true)  
            .childOption(ChannelOption.TCP_NODELAY, true);  
            //.childOption(ChannelOption.SO_BROADCAST, true);  
            //bootstrap.setOption("child.reuseAddress", true);        
            //bootstrap.setOption("child.tcpNoDelay", true);          
            //bootstrap.setOption("child.keepAlive", true);  

            final Channel ch = sb.bind(port).sync().channel();  
            System.out.println("Web socket server started at port " + port);  

            ch.closeFuture().sync();  
        } finally {  
            bossGroup.shutdownGracefully();  
            workerGroup.shutdownGracefully();  
        }  
    }  

/*    public static void main(String[] args) throws Exception {  
        int port;  
        if (args.length > 0) {  
            port = Integer.parseInt(args[0]);  
        } else {  
            port = 8080;  
        }  
        new WacWebSocketSerivce().run(port);  
    }  */
}