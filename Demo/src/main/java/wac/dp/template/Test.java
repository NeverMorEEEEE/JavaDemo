package wac.dp.template;

public class Test {
    public static void main(String[] args) {
        Student stu = new Student();
        stu.setName("大麻子");
        stu.setMoney(90000);
        stu.setScore(600);
        stu.setAddress("上宁桥");

        XueJun x = new XueJun();
        x.gotoSchool(stu);

        XindingFang xf = new XindingFang();
        xf.gotoSchool(stu);
    }
}
