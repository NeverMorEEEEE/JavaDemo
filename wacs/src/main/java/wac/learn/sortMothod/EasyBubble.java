package wac.learn.sortMothod;

import wac.dp.strategy.comparable;


/**
 *  常用排序方法： 冒择入(路)兮(希尔)快归堆
 * 
 * @author wac
 *
 */
public class EasyBubble {
	
	public static Object[] sort(Object[] arr){
		int len = arr.length;
		
		for(int i = 0;i<len;i++){
			for(int j = 0;j<len-i-1;j++){
				comparable oj = (comparable)arr[j];
				comparable oi = (comparable)arr[j+1];
				if(oj.compareTo(oi)>0){
					swap(arr,j,j+1);
					
				}
			}
		}
		for(Object i : arr){
			System.out.print(i + " , ");
		}
		
		return arr;
		
	}
	
	public static int[] sort(int[] arr){
		int len = arr.length;
		
		for(int i = 0;i<len;i++){
			for(int j = 0;j<len-i-1;j++){
				if(arr[j+1]<arr[j]){
					swap(arr,j,j+1);
					
				}
			}
		}
		return arr;
	}

	static void swap(Object[] arr,int i,int j){
		Object tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}

	static void swap(int[] arr,int i,int j){
		int tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}

	public static void main(String[] args) {
		Object[] arr = {7,1,3,6,12,67,2,123,51,5,9,52,125};
		
		EasyBubble.sort(arr);
	}

}
