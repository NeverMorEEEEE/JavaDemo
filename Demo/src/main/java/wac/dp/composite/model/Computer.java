package wac.dp.composite.model;

import java.util.ArrayList;
import java.util.List;

public class Computer implements Component{
	
private List<Component> list=new ArrayList<Component>();
	
	//添加组件
	public void add(Component component){
		list.add(component);
	}
	
	@Override
	public int getPrice() {
		int sum=0;
		for (Component component : list) {
			sum+=component.getPrice();
		}
		return sum;
	}
}
