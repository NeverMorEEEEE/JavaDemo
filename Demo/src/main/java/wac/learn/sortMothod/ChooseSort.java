package wac.learn.sortMothod;

import wac.dp.strategy.comparable;
import wac.dp.strategy.compartor;

public class ChooseSort {

	public static Object[] sort(Object[] arr){
		int len = arr.length;
		int max ;

		
		for(int i = len-1;i>=0;i--){
			max = i;
			for(int j = 0;j<i+1;j++){
//				if(arr[j]>arr[max]){
//					max = j;
//				}
//				compartor oj = (compartor)arr[j];
//				compartor oi = (compartor)arr[max];
//				if(oj.compareTo(oj,oi)>0){
//					max = j;
//				}
				comparable oj = (comparable)arr[j];
				comparable oi = (comparable)arr[max];
				if(oj.compareTo(oi)>0){
					max = j;
				}
			}
			EasyBubble.swap(arr,max,i);
			for(Object j : arr){
				System.out.print(j + " , ");
			}
			System.out.println();
		}
		
		return arr;
	}
	
	public static int[] sort(int[] arr){
		int len = arr.length;
		int max ;

		
		for(int i = len-1;i>=0;i--){
			max = i;
			for(int j = 0;j<i+1;j++){

				if(arr[j]>arr[max]){
					max = j;
				}
			}
			EasyBubble.swap(arr,max,i);
		}
		
		return arr;
	}
	
	
	
	
	public static void main(String[] args) {
		Integer[] arr = {7,1,3,6,12,67,2,123,51,5,9,52,125};
		
//		fastSort.sort(arr);
		

	}
	
}
