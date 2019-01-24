package wac.learn.jiecheng;

public class 阶乘 {
	
	public static int lauch(int i){
		if(i==0||i==1){
			return 1;
		}else{
			
			return i*lauch(i-1);
		}
	}
	
	public static void main(String[] args) {
		System.out.println(lauch(5));
	}

}
