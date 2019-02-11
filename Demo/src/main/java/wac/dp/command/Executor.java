package wac.dp.command;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Executor {

    private List<Command> commmands = new ArrayList<Command>();
    private Stack<Command> did = new Stack<Command>();

    public void addCommand(Command c) {
        commmands.add(c);
    }

    public void execute() {
        for (Command c : commmands) {
            c.excute();
            did.push(c);
        }
    }

    public void unexcute() {
        Command c = did.pop();
        c.unexcute();
    }


    public static void main(String[] args) {
        Command c1 = new ShoppingCommand();
        Command c2 = new HotelCommand();
        Command c3 = new ParkCommand();
        Executor exe = new Executor();

        exe.addCommand(c1);
        exe.addCommand(c2);
        exe.addCommand(c3);

        exe.execute();

        exe.unexcute();
    }


}
