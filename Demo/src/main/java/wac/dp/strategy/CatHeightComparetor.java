package wac.dp.strategy;

public class CatHeightComparetor implements compartor<cat> {

    @Override
    public int compareTo(cat o1, cat o2) {

        if (o1.height == o2.height) {
            return 0;
        } else {
            return o1.height > o2.height ? 1 : -1;
        }

    }


}
