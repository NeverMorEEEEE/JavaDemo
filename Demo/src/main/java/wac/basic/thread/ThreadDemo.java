package wac.basic.thread;

import java.util.concurrent.CountDownLatch;

public class ThreadDemo extends Thread{

    @Override
    public void run(){
        try{
            Thread.sleep(1000);
        }catch (InterruptedException e){
            e.printStackTrace();
        }
        System.out.print("run");
    }
    public static void main(String[] args){
        ThreadDemo example=new ThreadDemo();
        example.run();
        System.out.print("main");


    }
}
