package wac.dp.prototype.test;

import wac.dp.prototype.model.Sheep;


public class Test {
    public static void main(String[] args) throws CloneNotSupportedException {
        Sheep sheep = new Sheep();
        sheep.setColor("白色");
        sheep.setType("绵羊");

        Sheep duoli = (Sheep) sheep.clone(); //这个方法将创建一个新的对象

        System.out.println(sheep == duoli);
        System.out.println(duoli.getType() + "-->" + duoli.getColor());
    }
}
