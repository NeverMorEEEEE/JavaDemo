package wac.learn.practice.真题练习;

import wac.utils.Printer;

import java.util.Scanner;

public class 有赞 {
    public static boolean demo(int[] arr){
        int length = arr.length;
        for(int i=0;i<length;i++){

            if(arr[i]+i>=length||(arr[i]+i)<0){
                return true;
            }
        }
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        //获取输入的整数序列
        String str = sc.nextLine();
        String[] strings = str.split(" ");
        //转为整数数组
        int[] ints = new int[strings.length];
        for (int i = 0; i < strings.length; i++) {
            ints[i] = Integer.parseInt(strings[i]);
        }
        System.out.println(demo(ints));
    }
}
