package wac.utils;

/**
 * @author 作者 Your-Name:
 * @version 创建时间：2019年2月20日 下午4:23:46
 * 类说明
 */
public class Printer {

    public static void print(Object obj) {
        if (obj == null) {
            throw new NullPointerException();
        } else {

            System.out.print(obj.toString());
        }
    }

    public static void printb(Object obj) {
        System.out.println(obj == null ? "" : obj.toString());
    }

    public static void printArr(Object[] arr) {

        System.out.print("[");
        for(int i=0;i<arr.length;i++){
            if(i==arr.length){
                System.out.println("]");
            }else{
                System.out.print(arr[i] == null ? "" : arr[i].toString() +",");
            }
        }
    }

    public static void printArr(int[] arr) {

        System.out.print("[");
        for(int i=0;i<arr.length;i++){
            if(i==arr.length-1){
                System.out.println(arr[i] + "]");
            }else{
                System.out.print(arr[i] + " ,");
            }
        }
    }

    public static void println(Object obj) {
        System.out.println(obj == null ? "" : obj.toString());
    }



}
