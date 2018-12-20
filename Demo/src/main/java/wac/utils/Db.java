package wac.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.formula.functions.T;

import com.jfinal.plugin.activerecord.DbKit;

public class Db {
	
	DataBaseUtil dbsource = new DataBaseUtil();
	
	
	public <T> List<T> query(Connection conn,String sql) throws SQLException{
		List result = new ArrayList();
		PreparedStatement ps = conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery();
		int colAmount = rs.getMetaData().getColumnCount();
		if (colAmount > 1) {
			while (rs.next()) {
				Object[] temp = new Object[colAmount];
				for (int i=0; i<colAmount; i++) {
					temp[i] = rs.getObject(i + 1);
				}
				result.add(temp);
			}
		}
		else if(colAmount == 1) {
			while (rs.next()) {
				result.add(rs.getObject(1));
			}
		}
		dbsource.close(rs, ps);
		return result;
	}
	
	
	public <T> List<T> query(String sql){
		try {
			Connection conn = dbsource.getConnection();
			
			return query(conn,sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	
	public <T> T queryFirst(String sql){
		List<T> list = query(sql);
		return list.size()>0?list.get(0):null;
 	}

}
