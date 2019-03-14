package wac.dp.BehavioralPatterns.command;

public class ShoppingCommand extends Command {

    @Override
    public void excute() {
        System.out.println("去购物！");

    }

    @Override
    public void unexcute() {
        System.out.println("不购物了！");

    }

}
