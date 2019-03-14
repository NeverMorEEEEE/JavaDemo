package wac.basic.collection;


import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public class IteratorDemo {


    public static void main(String[] args) {
        List c = new LinkedList();
        c.add(2);
        c.add(123);
        c.add(3);
        c.add(6);
        c.add(8);
//		System.out.println(c);
//		System.out.println(c.insert(3, "^^"));
//		System.out.println(c);


        Iterator i = c.iterator();
        while (i.hasNext()) {
            if( (int)i.next()%2 == 0 ){
                i.remove();
            }
        }

        System.out.println("size : " + c.size());
    }

}
