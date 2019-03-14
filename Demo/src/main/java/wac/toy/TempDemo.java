package wac.toy;

import java.util.*;

public class TempDemo {

    public static void main(String[] args) {

//            String S = "(()())";
//            int index = 0;
//            int result= 0;
//            for (int i = 0; i < S.length(); i++) {
//                if(S.charAt(i) == '('){
//                    index ++;
//                    result = Math.max(index,result);
//                }else{
//                    index--;
//                }
//
//            }
//            System.out.println(result);

        String str = "xaXY";
        LinkedList<Integer> listi = new LinkedList<Integer>();
        LinkedList<Character> list1 = new LinkedList<Character>();
        LinkedHashSet<Character> list = new LinkedHashSet<Character>();
        LinkedList<Character> list2 = new LinkedList<Character>();
        char[] cs = str.toCharArray();
        for (char c: cs) {
                c = Character.toLowerCase(c);
                int index  = list1.indexOf(c);

            if(index >= 0){
                list1.remove(index);
                list2.add(c);
            }else{
                list1.add(c);
            }
        }
        Character min1 = list1.getFirst();
        int index1max =  str.indexOf(min1);
        char min = min1;
        for(int i =0;i<index1max;i++){
            char temp = list2.get(i);
            if((int)temp < (int)min){
                min = temp;
            }
        }
        System.out.println("min : " + min);
        }
}
