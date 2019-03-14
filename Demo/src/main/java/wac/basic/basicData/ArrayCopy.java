package wac.basic.basicData;


import java.util.Arrays;

/**
 * 复制的效率System.arraycopy>clone>Arrays.copyOf>for循环
 */
public class ArrayCopy {

    static int count = 1000;
    static int nums = 1000000;
    static int[] arr = null;

    //		for(int i=0;i<count;i++){
//
    //生成定长的随机数组
    static{
        arr = new int[nums];
        for (int j = 0; j < arr.length; j++) {
            arr[j] = (int) (Math.random() * 10000);
        }
        System.out.println("长度为" + nums + "的Int数组进行拷贝:");
    }

    public static void main(String[] args) {
        
        //  for循环copy
       new Thread() {
            @Override
            public void run() {
                long start = System.currentTimeMillis();
                int[] a1 = new int[nums];
                for (int j = 0; j < a1.length; j++) {
                    a1[j] = arr[j];
                }
                System.out.println("for循环copy用时 ：" + (System.currentTimeMillis() - start));
            }
        }.start();

        //  Arrays.cppy
        new Thread() {
            @Override
            public void run() {
                long start = System.currentTimeMillis();
                int[] a1 = Arrays.copyOf(arr, nums);
                System.out.println("Arrays.cppy用时 ：" + (System.currentTimeMillis() - start));
            }
        }.start();

        //  System.ArrayCopy
        new Thread() {
            @Override
            public void run() {
                long start = System.currentTimeMillis();
                int[] a1 = new int[nums];
                System.arraycopy(arr, 0, a1, 0, nums);
                System.out.println("System.ArrayCopy用时 ：" + (System.currentTimeMillis() - start));
            }
        }.start();

        //  Clone
        new Thread() {
            @Override
            public void run() {
                long start = System.currentTimeMillis();
                int[] a1 = arr.clone();
                System.out.println("Clone用时 ：" + (System.currentTimeMillis() - start));
            }
        }.start();

    }

}
