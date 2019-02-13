package wac.basic.IO;

import java.net.URL;

import org.hibernate.validator.internal.util.privilegedactions.GetClassLoader;

public class PathDemo {

    public static void main(String[] args) {
        URL url = PathDemo.class.getClass().getResource("classpath:/static/");
        System.out.println("URL : " + url);

    }
}
