package wac.toy;

import java.util.LinkedList;
import java.util.List;

public class mq implements Runnable {
    static String[] ls = {"A", "B", "C", "D"};

    static List<Integer> res = new LinkedList();

    public static boolean check(String str) {
        return str.contains("A") && str.contains("B") && str.contains("C") && str.contains("D");
    }

    public static void main(String[] args) {
        int pooSize = 9000;
        for (int i = 0; i < pooSize; i++) {
            new Thread(new mq()).start();
        }
        try {
            Thread.sleep(2300);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("结束");
        int mount = 0;
        System.out.println(res.size());
        for (int i = 0; i < res.size(); i++) {
            mount += res.get(i);
            //	System.out.println(res.get(i));
        }
        System.out.println("总次数：" + mount);
        System.out.println("平均次数：" + mount / pooSize);

    }

    @Override
    public void run() {
        String r = "";
        int i = 0;
        while (!check(r)) {
            i++;
            r += ls[(int) ((Math.random()) * 4)];

        }

        res.add(i);
        System.out.println(Thread.currentThread().getName() + " 完成计算,次数 ： " + i);
    }

}
