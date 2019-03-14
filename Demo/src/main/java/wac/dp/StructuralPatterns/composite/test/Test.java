package wac.dp.StructuralPatterns.composite.test;

import wac.dp.StructuralPatterns.composite.model.CPU;
import wac.dp.StructuralPatterns.composite.model.Computer;
import wac.dp.StructuralPatterns.composite.model.Display;
import wac.dp.StructuralPatterns.composite.model.KeyBord;
import wac.dp.StructuralPatterns.composite.model.MainBord;
import wac.dp.StructuralPatterns.composite.model.Memory;
import wac.dp.StructuralPatterns.composite.model.Mouse;

/**
 * 组合(Composite)模式
 * 将对象以树形结构组织起来，以达成“部分－整体”的层次结构，使得客户端对单个对象和组合对象的使用具有一致性。
 *
 * @author Administrator
 * @date 2018年4月8日
 */
public class Test {
    public static void main(String[] args) {
        //创建对象
        CPU cpu = new CPU();
        Display display = new Display();
        KeyBord keybord = new KeyBord();
        Memory memory = new Memory();
        Mouse mouse = new Mouse();
        Computer computer = new Computer();
        MainBord mainBord = new MainBord();

        //确定对象的关系
        mainBord.add(memory);
        mainBord.add(cpu);

        computer.add(display);
        computer.add(mouse);
        computer.add(keybord);
        computer.add(mainBord);

        System.out.println(computer.getPrice());
    }
}
