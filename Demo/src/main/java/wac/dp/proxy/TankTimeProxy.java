package wac.dp.proxy;

public class TankTimeProxy implements Movable {
    public TankTimeProxy(Movable t) {
        super();
        this.t = t;
    }

    Movable t;

    @Override
    public void move() {
        Long start = System.currentTimeMillis();
        System.out.println("Move 开始:");
        t.move();
        System.out.println("Move 结束,用时 " + (System.currentTimeMillis() - start));
    }
}