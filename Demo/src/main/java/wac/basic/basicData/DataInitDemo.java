package wac.basic.basicData;

public class DataInitDemo {
    Integer i1;
    int i2;
    String name;
    long id;

    public Integer getI1() {
        return i1;
    }

    public int getI2() {
        return i2;
    }

    public String getName() {
        return name;
    }

    public long getId() {
        return id;
    }

    public static void main(String[] args) {
        DataInitDemo dd = new DataInitDemo();
        System.out.println(dd.getI1());
        System.out.println(dd.getI2());
        System.out.println(dd.getId());
        System.out.println(dd.getName());
    }
}
