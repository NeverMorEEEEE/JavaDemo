package wac.dp.CreationalPatterns.singleTon;

/**
 * 双检锁模式
 *  volatile
 *
 */
public class DBCSingleTon {

    private DBCSingleTon() {

    }

    /**
     * instance = new Singleton()看起来很好，但是还是有问题的，因为这段代码是非原子操作，存在3个动作
     * 1.给instance分配内存  2.调用构造函数  3.将instance对象指向分配的内存空间（这步执行完instance就非null）
     *  JVM 的即时编译器中存在指令重排序的优化，上面2、3执行顺序是没法保证的，可能1-2-3，也可能1-3-2，
     *  这样在多线程的情况下可能会有报错的情况
     *
     *  有些人认为使用 volatile 的原因是可见性，也就是可以保证线程在本地不会存有 instance 的副本，每次都是去主内存中读取。
     *  但其实是不对的。使用 volatile 的主要原因是其另一个特性：禁止指令重排序优化。也就是说，在 volatile 变量的赋值操作
     *  后面会有一个内存屏障（生成的汇编代码上），读操作不会被重排序到内存屏障之前。比如上面的例子，取操作必须在执行完 1-2-3
     *  之后或者 1-3-2 之后，不存在执行到 1-3 然后取到值的情况。从「先行发生原则」的角度理解的话，就是对于一个 volatile
     *  变量的写操作都先行发生于后面对这个变量的读操作（这里的“后面”是时间上的先后顺序）。
     *
     */
    private volatile static DBCSingleTon instance = null;

    public static DBCSingleTon getInstances() {
        if (instance == null) {
            try {
                Thread.sleep(30);
            } catch (Exception e) {
                e.printStackTrace();
            }

            synchronized (DBCSingleTon.class) {
                if (instance == null) {
                    instance = new DBCSingleTon();
                }
            }
        }
        return instance;
    }

}
