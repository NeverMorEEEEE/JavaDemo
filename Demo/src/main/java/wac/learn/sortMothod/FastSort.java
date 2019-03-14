package wac.learn.sortMothod;

import java.util.Arrays;
import java.util.Random;


/**
 *  快排采用了分治的策略，分治法的基本思想是：将原问题分解为若干个规模更小但结构与原问题相似的子问题。
 *  递归地解这些子问题，然后将这些子问题的解组合为原问题的解。
 *  时间复杂度： T(n) 最好 O(nlog(n))  最差  O(n^2)
 *  空间复杂度： 需要栈空间进行递归
 *  最坏 ：S(N) O（n）   最好： O(log(n))
 * @author Administrator
 * @date 2018年5月22日
 */
public class FastSort {

    public static void showArr(int[] a) {
        System.out.print("[ ");
        for (int i : a) {
            System.out.print(i + ",");
        }
        System.out.println("]");
    }


    public static void FastSort(int[] a, int left, int right) {
        int i = left;
        int temp = a[i];
        int j = right;

//		System.out.println("left : " + left + " ,right: "+ right);
        if (left > right) {
            return;
        }
        while (i < j) {
            //顺序很重要，从右边开始往左边算
            while (a[j] >= temp && i < j) {
                j--;
            }
            while (a[i] <= temp && i < j) {
                i++;
            }
            //循环结束，找到a[i]>a[j]或者碰撞到了
            if (a[i] > a[j]) {
                EasyBubble.swap(a, i, j);
//				showArr(a);
//				System.out.println("a[i]: " + a[i] + ", a[j]: " + a[j] );
            }
//			System.out.println("After Swap : " + i  + " , " + j);
        }
        //temp充当中值，分完放到中间来，
        a[left] = a[i];
        a[i] = temp;
        if (i > 0)
            FastSort(a, left, i - 1);

        if (i < a.length - 1)
            FastSort(a, i + 1, right);

    }

    public static void FastSort3(int[] a, int left, int right) {
        int i = left;
        int temp = a[left];
        int j = right;

        if((right-left)>2){
            // 三点取中法
            int mid = left + (right-left)/2;

            int[] arr = {a[left],a[mid],a[right]};
            Arrays.sort(arr);
            a[left] = arr[1];
            i++;
            temp = arr[1];
            a[mid] = arr[0];
            a[right] = arr[2];
        }else{
            // 长度都没超过2，排个毛线的序啊


        }



//		System.out.println("left : " + left + " ,right: "+ right);
        if (left > right) {
            return;
        }
        while (i < j) {
            //顺序很重要，从右边开始往左边算
            while (a[j] >= temp && i < j) {
                j--;
            }
            while (a[i] <= temp && i < j) {
                i++;
            }
            //循环结束，找到a[i]>a[j]或者碰撞到了
            if (a[i] > a[j]) {
                EasyBubble.swap(a, i, j);
//				showArr(a);
//				System.out.println("a[i]: " + a[i] + ", a[j]: " + a[j] );
            }
//			System.out.println("After Swap : " + i  + " , " + j);
        }
        //temp充当中值，分完放到中间来，
        a[left] = a[i];
        a[i] = temp;
        if (i > 0)
            FastSort(a, left, i - 1);

        if (i < a.length - 1)
            FastSort(a, i + 1, right);

    }


//	int PartSort1(int[] a,int left,int right)//左右指针法  
//	{  
//	    int mid = GetMidIndex(a,left,right);    //此处是对快排的优化，再后面会提到  
//	    swap(a[mid],a[right]);  
//	  
//	    int key = right;//利用key作为基准值的下标  
//	  
//	    while (left < right)  
//	    {  
//	        //左指针向右找第一个比key大的数  
//	        while (left < right && a[left] <= a[key])  
//	        {  
//	            ++left;  
//	        }  
//	        //右指针向左扎找第一个比key的数  
//	        while (left < right && a[right] >= a[key])  
//	        {  
//	            --right;  
//	        }  
//	        //交换左右指针所指的值  
//	        if (a[left] != a[right])  
//	        {  
//	            std::swap(a[left],a[right]);  
//	        }  
//	    }  
//	    //将key值放到正确位置上  
//	    swap(a[left],a[key]);  
//	  
//	    return left;  
//	}  

    public static void main(String[] args) {
//		int[] arr = {31,41,213,5,123,5,1,5,236,6,6,26,62,26,26,763,8738,25,3467,2,13};
//		
//		FastSort.sort(arr, 0, arr.length-1);
//		FastSort.showArr(arr);
        int count = 1000;
        int nums = 100000;
        int[] arr = null;

//		for(int i=0;i<count;i++){
//			
        //生成定长的随机数组
        arr = new int[nums];
        for (int j = 0; j < arr.length; j++) {
            arr[j] = (int) (Math.random() * 10000);
        }
        System.out.println("长度为" + nums + "的Int数组进行排序:");

//        ShuffleUtil.shuffle(arr);
        //冒泡排序
//        long start = System.currentTimeMillis();
//        EasyBubble.sort(arr);
//        System.out.println("冒泡用时 ：" + (System.currentTimeMillis() - start));

        ShuffleUtil.shuffle(arr);
        //选择排序
        long cs = System.currentTimeMillis();
        ChooseSort.sort(arr);
        System.out.println("选择用时 ：" + (System.currentTimeMillis() - cs));

        ShuffleUtil.shuffle(arr);
        //插入排序
        long s1 = System.currentTimeMillis();
        InsertSort.sort1(arr);
        System.out.println("插入排序用时 ：" + (System.currentTimeMillis() - s1));



        ShuffleUtil.shuffle(arr);
        //快速排序
        long s2 = System.currentTimeMillis();
        FastSort.FastSort(arr, 0, arr.length - 1);
        System.out.println("快速用时 ：" + (System.currentTimeMillis() - s2));

        ShuffleUtil.shuffle(arr);
        //快速排序 改进，使用三点取中法
        long s3 = System.currentTimeMillis();
        FastSort.FastSort3(arr, 0, arr.length - 1);
        System.out.println("优化快速用时 ：" + (System.currentTimeMillis() - s3));

    }

//	}

}
