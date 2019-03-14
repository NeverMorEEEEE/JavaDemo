package wac.dp.CreationalPatterns.singleTon;

/**
 *  简单来说“任何一个readObject方法，不管是显式的还是默认的，它都会返回一个新建的实例，这个新建的实例不同于该类初始化时创建的实例。”
 *  当然，这个问题也是可以解决的，想详细了解的同学可以翻看《effective java》第77条：对于实例控制，枚举类型优于readResolve。
 *
 *
 *  使用枚举类型时，就没有序列化和反射的问题了，由JVM来保证单例
 *
 */
public enum EnumSingleTon {
    instance;

    private inner _instance;

    public void test() {
        System.out.println("test function");
    }

    EnumSingleTon() {
        System.out.println("Call EnumSingleTon's Constractor");
        _instance = new inner();
    }

    public static class inner {

    }

    public inner getInstances() {
        return _instance;
    }

}
