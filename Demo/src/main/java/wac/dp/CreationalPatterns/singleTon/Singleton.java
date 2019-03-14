package wac.dp.CreationalPatterns.singleTon;

/**
 * 创建型设计模式-->单例模式
 * 保证一个类仅有一个实例对象，并提供访问这个实例的全局访问点。
 * <p>
 * 需要确保某个类只要一个对象，或创建一个类需要消耗的资源过多，如访问IO和数据库操作等，这时就需要考虑使用单例模式了。
 * <p>
 * 有多种实现模式
 * 将构造函数访问修饰符设置为private
 * 通过一个静态方法或者枚举返回单例类对象，确保单例类的对象有且只有一个，特别是在多线程环境下，确保单例类对象在反序列化时不会重新构建对象
 *
 * @author Administrator
 */
public class Singleton {


    public static class Inner {

        static {
            System.out.println("TestInner Static!");
        }

        public final static Singleton testInstance = new Singleton(3);

    }


    public

    static Singleton getInstance() {

        return

                Inner.testInstance;

    }


    public Singleton(int

                             i) {

        System.out.println("Test"
                + i + "Construct! ");

    }


    //类静态块

    static

    {

        System.out.println("Test Static");

    }


    //类静态属性

    public static Singleton testOut = new Singleton(1);


    public static void main(String args[]) {

        Singleton t = new Singleton(2);

        Singleton.getInstance();

    }


}