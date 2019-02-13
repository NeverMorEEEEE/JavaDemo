package wac.concurrent.base;

public class JoinDemo {

    public static void main(String[] args) {

        Thread t1 = new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    System.out.println("sleep 3000ms");
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        });
        System.out.println("开始时间： " + System.currentTimeMillis());
        t1.start();
        try {
            t1.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        System.out.println("结束时间： " + System.currentTimeMillis());
    }
}
