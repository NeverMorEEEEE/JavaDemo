package wac.dp.template;

public class XindingFang extends School {

    @Override
    public boolean checkStudent(Student student) {
        if (student.getMoney() >= 20000) {
            return true;
        }
        return false;
    }

}
