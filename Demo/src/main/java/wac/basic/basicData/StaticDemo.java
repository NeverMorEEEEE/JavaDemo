package wac.basic.basicData;

public class StaticDemo {
    private static int x = 100;
    public static void main(String args[ ]){
        StaticDemo hs1 = new StaticDemo();
        hs1.x++;
        StaticDemo hs2 = new StaticDemo();
        hs2.x++;
        hs1=new StaticDemo();
        hs1.x++;
        StaticDemo.x--;
        System.out.println( "x=" +x);

    }
}
