package wac.dp.strategy;

import wac.learn.sortMothod.ChooseSort;
import wac.learn.sortMothod.FastSort;

public class cat implements compartor<cat>,comparable<cat>{
	
	public float weight;
	public float height;
	public String name;
	
	private compartor comparetor = new CatHeightComparetor();
	
	public cat() {
		super();
		// TODO Auto-generated constructor stub
	}
	public cat(float weight, float height, String name) {
		super();
		this.weight = weight;
		this.name = name;
		this.height = height;
	}
	
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getHeight() {
		return height;
	}
	public void setHeight(float height) {
		this.height = height;
	}
	
	

	@Override
	public String toString() {
		return "cat [weight=" + weight + ", height=" + height + ", name="
				+ name + "]";
	}

	
	@Override
	public int compareTo(cat o) {
		if(o instanceof cat){
//			if(weight == ((cat)o).weight){
//				return 0;
//			}else{
//				return weight > ((cat)o).weight?1:-1;
//			}
			if(height == ((cat)o).height){
				return 0;
			}else{
				return height > ((cat)o).height?1:-1;
			}
		}
		return 0;
	}
	
	@Override
	public int compareTo(cat o1,cat o2) {
		return comparetor.compareTo(o1, o2);
	}
	
	
	public static void main(String[] args) {
		cat[] cats = new cat[]{new cat(1.2f,4.3f,"tom"),new cat(2.2f,3.1f,"candy"),new cat(0.8f,4.9f,"Sindy"),new cat(0.2f,2.3f,"Nancy"),new cat(3.2f,1.8f,"John")};
		for(cat c : cats){
			System.out.print(c.height + " , ");
		}
		ChooseSort.sort(cats);
		System.out.println(cats);
		
		for(cat c : cats){
			System.out.print(c.height + " , ");
		}
	}
}
