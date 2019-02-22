package wac.dp.flyweight;

/**
 * 　说到享元模式，第一个想到的应该就是池技术了，String常量池、数据库连接池、缓冲池等等
 * 都是享元模式的应用，所以说享元模式是池技术的重要实现方式。
 */
public abstract class Flyweight {
    //内部状态：在享元对象内部不随外界环境改变而改变的共享部分。

    //外部状态：随着环境的改变而改变，不能够共享的状态就是外部状态。



    //内部状态
    public String intrinsic;
    //外部状态
    protected final String extrinsic;

    //要求享元角色必须接受外部状态
    public Flyweight(String extrinsic) {
        this.extrinsic = extrinsic;
    }

    //定义业务操作
    public abstract void operate(int extrinsic);

    public String getIntrinsic() {
        return intrinsic;
    }

    public void setIntrinsic(String intrinsic) {
        this.intrinsic = intrinsic;
    }
}
