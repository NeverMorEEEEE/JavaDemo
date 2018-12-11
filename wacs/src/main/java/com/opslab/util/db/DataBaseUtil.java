package com.opslab.util.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

import com.jfinal.kit.LogKit;
import com.jfinal.plugin.activerecord.ActiveRecordException;
import com.jfinal.plugin.activerecord.SqlReporter;

public class DataBaseUtil {
	
	private ThreadLocal<Connection> threadLocal = new ThreadLocal<Connection>();
	
	@Autowired
	DataSource dataSource;
	
	Boolean showSql = true;
	
	// --------
	
		/**
		 * Support transaction with Transaction interceptor
		 */
		public final void setThreadLocalConnection(Connection connection) {
			threadLocal.set(connection);
		}
		
		public final void removeThreadLocalConnection() {
			threadLocal.remove();
		}
		
		/**
		 * Get Connection. Support transaction if Connection in ThreadLocal
		 */
		public final Connection getConnection() throws SQLException {
			Connection conn = threadLocal.get();
			if (conn != null)
				return conn;
			return dataSource.getConnection();
		}
		
		/**
		 * Helps to implement nested transaction.
		 * Tx.intercept(...) and Db.tx(...) need this method to detected if it in nested transaction.
		 */
		public final Connection getThreadLocalConnection() {
			return threadLocal.get();
		}
		
		/**
		 * Return true if current thread in transaction.
		 */
		public final boolean isInTransaction() {
			return threadLocal.get() != null;
		}
		
		/**
		 * Close ResultSet銆丼tatement銆丆onnection
		 * ThreadLocal support declare transaction.
		 */
		public final void close(ResultSet rs, Statement st, Connection conn) {
			if (rs != null) {try {rs.close();} catch (SQLException e) {LogKit.error(e.getMessage(), e);}}
			if (st != null) {try {st.close();} catch (SQLException e) {LogKit.error(e.getMessage(), e);}}
			
			if (threadLocal.get() == null) {	// in transaction if conn in threadlocal
				if (conn != null) {try {conn.close();}
				catch (SQLException e) {throw new ActiveRecordException(e);}}
			}
		}
		
		public final void close(Statement st, Connection conn) {
			if (st != null) {try {st.close();} catch (SQLException e) {LogKit.error(e.getMessage(), e);}}
			
			if (threadLocal.get() == null) {	// in transaction if conn in threadlocal
				if (conn != null) {try {conn.close();}
				catch (SQLException e) {throw new ActiveRecordException(e);}}
			}
		}
		
		public final void close(Connection conn) {
			if (threadLocal.get() == null)		// in transaction if conn in threadlocal
				if (conn != null)
					try {conn.close();} catch (SQLException e) {throw new ActiveRecordException(e);}
		}


}
