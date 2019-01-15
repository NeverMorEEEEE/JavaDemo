package com.zjtzsw.modules.socketService.handler;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.util.concurrent.GlobalEventExecutor;

public class CustomTextFrameHandler extends
        SimpleChannelInboundHandler<TextWebSocketFrame> {
	//代表其他用户链接
    private static ChannelGroup recipients = new DefaultChannelGroup(
            "ChannelGroups", GlobalEventExecutor.INSTANCE);

    public CustomTextFrameHandler() {

    }

    @Override
    protected void messageReceived(ChannelHandlerContext ctx,
            TextWebSocketFrame frame) throws Exception {
        String request = frame.text();

        // ctx.channel().writeAndFlush(new
        // TextWebSocketFrame(request.toUpperCase()));
        System.out.println("size:" + recipients.size());
        // 直接推送内容给其他链接
        recipients.writeAndFlush(new TextWebSocketFrame(request.toUpperCase()));

    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        recipients.add(ctx.channel());
        System.out.println("connect:" + recipients.size());
    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) {
        try {
            recipients.remove(ctx.channel());
            System.out.println("删除channel成功" + recipients.size());
        } catch (Exception ex) {
            System.out.println("删除channel失败" + ex.getMessage());
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}