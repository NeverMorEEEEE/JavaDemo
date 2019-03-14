package wac.dp.BehavioralPatterns.template;

public class XueJun extends School {

    @Override
    public boolean checkStudent(Student student) {
        if (student.getMoney() >= 2000 && student.getScore() >= 600 && student.getAddress().equals("上宁桥")) {
            return true;
        }
        return false;
    }

}
