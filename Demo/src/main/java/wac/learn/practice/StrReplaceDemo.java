package wac.learn.practice;


import wac.utils.Printer;

public class StrReplaceDemo {

    public String replaceSpace(StringBuffer str) {
            int index;
            while(str.indexOf(" ")>=0) {
                index = str.indexOf(" ");
                str.replace(index, index + 1, "%20");
            }
            return str.toString();
    }

    public static void main(String[] args) {
        Printer.println(new StrReplaceDemo().replaceSpace(new StringBuffer("We Are Happy")));
    }
}
