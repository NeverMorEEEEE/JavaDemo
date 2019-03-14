package wac.dp.BehavioralPatterns.command;

public class HotelCommand extends Command {

    @Override
    public void excute() {
        System.out.println("开房！住店。");

    }

    @Override
    public void unexcute() {
        System.out.println("退房！跑路");

    }

}
