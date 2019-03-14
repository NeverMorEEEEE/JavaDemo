package wac.basic.basicData;

public class ByteDemo {

    public ByteDemo() {
        System.out.println("ByteDemo Constructer!");
    }

    /**
     * 被final修饰的变量是常量，这里的b6=b4+b5可以看成是b6=10；在编译时就已经变为b6=10了
     * 而b1和b2是byte类型，java中进行计算时候将他们提升为int类型，再进行计算，b1+b2计算后已经是int类型，赋值给b3，b3是byte类型，
     * 类型不匹配，编译不会通过，需要进行强制转换。
     * Java中的byte，short，char进行计算时都会提升为int类型。
     * @param args
     */
    public static void main(String[] args) {
        byte b1=1,b2=2,b3,b6;
        final byte b4=4,b5=6;
        b6=b4+b5;
//        b3=(b1+b2);
        System.out.println(b6);

        byte i = 4,j=7;
//        i = i>>1;
        System.out.println(i);
        i = 15;
        System.out.println();
    }
}
