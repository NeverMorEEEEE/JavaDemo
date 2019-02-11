package wac.dp.command;

public class ParkCommand extends Command {

    @Override
    public void excute() {
        System.out.println("去公园玩！");

    }

    @Override
    public void unexcute() {
        System.out.println("不公园玩！");

    }

}
