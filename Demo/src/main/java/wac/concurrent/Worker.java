package wac.concurrent;

import wac.utils.Printer;

import java.util.concurrent.Callable;

/**
 * 定义一个task
 */
class Worker implements Callable {
    private volatile int job;

    public Worker(){
        super();
        init();
        Printer.print("init:" +this);
    }

    public void init(){
        job = 0;
    }

    public boolean isDone(){
        Printer.print("isDone:" +this);
        if(job==1) {
            return true;
        }
        return false;
    }

    @Override
    public Object call() throws Exception {
        Printer.print("calling : " +this);
        if(isDone()){
            return "done";
        }

        return "todo";
    }
}
