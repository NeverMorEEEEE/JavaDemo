package wac.basic.reflect;

public class ReflectDemo {

    private String name;
    public int id ;

    public ReflectDemo() {
    }

    public ReflectDemo(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static void main(String[] args) {
        try{
            Class clazz = Class.forName("wac.basic.reflect.ReflectDemo");
        }catch (Exception e){
            e.printStackTrace();
        }




    }
}
