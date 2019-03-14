package wac.basic.basicData;

import java.io.Serializable;

public class IntDemo  extends Thread implements Serializable{

    public void IntDemo(){

    }

    public static void main(String[] args) {

        Integer i1 = 47;
        Integer i2 = new Integer(47);
        Integer i = 47;

        System.out.println(i == i1);
        System.out.println(i1 == i2);
        System.out.println(i == i2);

        Float f[] = new Float[2];
        Float f1[] = new Float[2];


        System.out.println(f);

        long x=42;
        f1[0]=42.0f;

        System.out.println(x==f1[0]);




    }
}

class Test {
    public static void main(String[] args) {
        System.out.println(100 + 5 +"is");
    }
}
