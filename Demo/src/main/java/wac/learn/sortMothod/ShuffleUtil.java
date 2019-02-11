package wac.learn.sortMothod;

import java.util.Random;

public class ShuffleUtil {

    public static void shuffle(int[] arr) {
        int[] a = arr.clone();
        int count = arr.length;
        int randomCount = 0;
        int temp;
        while (randomCount++ < count - 1) {
            temp = new Random().nextInt(count - randomCount);
            arr[randomCount] = a[temp];
//			System.out.println("第"+ randomCount +"次随机到  arr["+temp +"] = " + a[temp]);
            a[temp] = a[count - randomCount];
//			FastSort.showArr(a);
//			FastSort.showArr(arr);

        }


    }

    public static void main(String[] args) {
        int[] arr = {31, 41, 213, 5, 123, 5, 1, 5, 236, 6, 6, 26, 62, 26, 26, 763, 8738, 25, 3467, 2, 13};
        System.out.println(arr.length);
        ShuffleUtil.shuffle(arr);
        System.out.println(arr.length);
    }

}
