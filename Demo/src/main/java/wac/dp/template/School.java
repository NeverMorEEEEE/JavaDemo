package wac.dp.template;
/*
 * 模板方法
 * 定义一个算法的骨架，将具体的步骤延迟到子类。子类可以不改变一个算法的架构即可重定义该算法特定的步骤。
 * */
public abstract class School {
	public abstract boolean checkStudent(Student student); 
	
	public void gotoSchool(Student student){
		if(checkStudent(student)){
			System.out.println("恭喜 "+student.getName()+" 童鞋 你被录取啦");
		}else{
			System.out.println("抱歉"+student.getName()+" 童鞋 你落榜啦");
			
		}
	}
}
