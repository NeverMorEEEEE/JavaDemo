package wac.basic.IO;

import java.net.URL;
import java.util.Arrays;
import java.util.List;

import org.hibernate.validator.internal.util.privilegedactions.GetClassLoader;

public class PathDemo {

    public static void main(String[] args) {
        URL url = PathDemo.class.getClass().getResource("classpath:/static/");
        System.out.println("URL : " + url);
        
        List<String> myList =
        	    Arrays.asList("a1", "a2", "b1", "c2", "c1");

        	myList
        	    .stream()
        	    .filter(s -> s.startsWith("c"))
        	    .map(String::toUpperCase)
        	    .sorted()
        	    .forEach(System.out::println);

    }
}
