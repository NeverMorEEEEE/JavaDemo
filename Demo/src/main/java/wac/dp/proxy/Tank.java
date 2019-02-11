package wac.dp.proxy;

import java.util.Random;

public class Tank implements Movable {

    @Override
    public void move() {
        Long start = System.currentTimeMillis();
        System.out.println("Tank Move 开始:");
        System.out.println("Tank Moving!");
        try {
            Thread.sleep(new Random().nextInt(10000));
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("Tank Move 结束,用时 " + (System.currentTimeMillis() - start));
    }

    public void test(Object... args) {
        System.out.println(args.getClass());
        for (Object arg : args) {
            System.out.println(arg);
        }
    }
}
