package wac.basic.stringDemo;

import java.util.Arrays;

/**
 *  在1.8中，可以看到char数组
 */
public class CharsToStringDemo {

    public static void main(String[] args) {
//        char[] chars = new char[]{'a','b','c','d','1','&'};
//
//        System.out.println("Hash : " + chars.hashCode());
//        char[] ncs1 = Arrays.copyOfRange(chars,0,2);
//
//        System.out.println("ncs : " + ncs1 + ", hash: " + ncs1.hashCode());
//
//        char[] ncs2 = Arrays.copyOfRange(chars,0,2);
//
//        System.out.println("ncs : " + ncs2 + ", hash: " + ncs2.hashCode());
//
//        String tt = "asdb2131 ";

//        String s1 = new String("11");
//        String s2 = "11";

//        String s3 = new String("1") + new String("1");
//        String s3 = new String("11");
        String s3 = "1" + "1";



//        System.out.println(s1==s2);
//        System.out.println(s3==s2);
//        System.out.println(s3== s3.intern());
        String s4 = "11";
        System.out.println(s3==s4);
        System.out.println(s3==s4.intern());



//        String s = new String("1");
//        s.intern();
//        String s2 = "1";
//        System.out.println(s == s2);
//
//        String s3 = new String("1") + new String("1");
//        s3.intern();
//        String s4 = "11";
//        System.out.println(s3 == s4);

    }
}
