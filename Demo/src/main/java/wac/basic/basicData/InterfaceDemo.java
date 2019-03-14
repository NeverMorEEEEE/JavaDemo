package wac.basic.basicData;

import java.io.Serializable;

/**
 *
 * 在接口里面的变量默认都是public static final 的，它们是公共的,静态的,最终的常量.相当于全局常量，可以直接省略修饰符。
 * 实现类可以直接访问接口中的变量
 */
abstract interface InterfaceDemo  extends  Iterable, Serializable {

    public void fun(int i);
}

class A implements B{
    public static void main(String args[]){
        int i;
        A a1=new  A();
        i =a1.k;
        System.out.println("i="+i);
    }
}
interface B{
    int k=10;

}
