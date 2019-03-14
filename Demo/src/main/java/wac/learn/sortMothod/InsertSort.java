package wac.learn.sortMothod;


import wac.utils.Printer;

/**
 *  将数据分为有序和无序，构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入
 */
public class InsertSort {

    /**
     *  瞎写的
     * @param arr
     * @return
     */
    public static int[] sort(int[] arr){
        int len = arr.length;
        int t,j;
        for(int i=1;i<len;i++){
            t = arr[i];
            j= i -1;
            for(;j>=0;j--){
                if(arr[j]>t){
                    arr[j+1] = arr[j];
                }
                if(arr[j]<t){
                    arr[j+1] = t;
                    break;
                }
                if(j==0&&arr[j]>t){
                    arr[j] = t;
                }
            }
        }
//        Printer.printArr(arr);
        return arr;
    }

    /**
     *  标准写法
     * @param arr
     * @return
     */
    public static int[] sort1(int[] arr){
        int len = arr.length;
//        System.out.println("len: " + len);
        int t,j;
        for(int i=1;i<len;i++){
            t = arr[i];
            j= i -1;
            while(j>=0&&arr[j]>t){
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = t;
        }
//        Printer.printArr(arr);
        return arr;
    }


    public static int[] sort2(int[] array, int first, int last) {
        int i, j;
        int temp;
        for (i = first + 1; i <= last; i++) {
            temp = array[i];
            j = i - 1;
            //与已排序的数逐一比较，大于temp时，该数后移
            while ((j >= first) && (array[j] > temp))  //当first=0，j循环到-1时，由于[[短路求值]]，不会运算array[-1]
            {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = temp;      //被排序数放到正确的位置
        }
        return array;
    }

    public void shellSort(int[] arr,int n,int[] d,int t){

    }


    public static void main(String[] args) {
        Printer.printArr(sort1(new int[]{4,7,2,1,5,3,8,6}));
        Printer.printArr(sort2(new int[]{4,7,2,1,5,3,8,6},0,7));
    }

}
