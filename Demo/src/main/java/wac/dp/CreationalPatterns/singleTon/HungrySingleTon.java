package wac.dp.CreationalPatterns.singleTon;

public class HungrySingleTon {

    private HungrySingleTon() {

    }

    private static HungrySingleTon instance = new HungrySingleTon();

    public static HungrySingleTon getInstances() {
        return instance;
    }
}
