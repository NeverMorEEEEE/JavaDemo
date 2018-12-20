package wac.dp.proxy.test;

public class UserMgrImpl implements UserMgr{

	@Override
	public void addUser() {
		System.out.println("1. 插入User记录到一张表");
		System.out.println("2. 记录日志到另一张表");
	}

}
