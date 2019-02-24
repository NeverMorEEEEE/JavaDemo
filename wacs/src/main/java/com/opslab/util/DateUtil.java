package com.opslab.util;

import java.io.PrintStream;
import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import wac.basic.exception.AppException;





public abstract class DateUtil
{
	public static final String HH_MM_SS = "HH:mm:ss";
	public static final String YYYY_MM_DD = "yyyy-MM-dd";
	public static final String MM_DD = "MM-dd";
	public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
	public static final String YY_MM_DD_HH_MM_SS = "yy-MM-dd HH:mm:ss";

	public DateUtil() {}


	public static java.util.Date getDate()
	{
		Calendar oneCalendar = Calendar.getInstance();
		return getDate(oneCalendar.get(1), 
				oneCalendar.get(2) + 1, 
				oneCalendar.get(5));
	}














	public static java.util.Date getDate(int yyyy, int MM, int dd)
	{
		return getDate(yyyy, MM, dd, 0, 0, 0);
	}





















	public static java.util.Date getDate(int yyyy, int MM, int dd, int HH, int mm, int ss)
	{
		if (!verityDate(yyyy, MM, dd))
			throw new IllegalArgumentException("不是有效的时间");
		Calendar oneCalendar = Calendar.getInstance();
		oneCalendar.clear();
		oneCalendar.set(yyyy, MM - 1, dd, HH, mm, ss);
		return new java.util.Date(oneCalendar.getTime().getTime());
	}






	public static String getYear()
	{
		Calendar calendar = Calendar.getInstance();
		String year = String.valueOf(calendar.get(1));
		return year;
	}






	public static String getMonth()
	{
		Calendar calendar = Calendar.getInstance();
		int s = calendar.get(2) + 1;
		String month = "";
		if (s < 10) {
			month = "0" + s;
		} else {
			month = String.valueOf(s);
		}
		return month;
	}






	public static String getDay()
	{
		Calendar calendar = Calendar.getInstance();
		int s = calendar.get(5);
		String day = "";
		if (s < 10) {
			day = "0" + s;
		} else {
			day = String.valueOf(s);
		}
		return day;
	}






	public static String getCurrentYearMonthDay()
	{
		return getYear() + getMonth() + getDay();
	}






	public static java.util.Date getSystemCurrentTime()
	{
		long currentTime = System.currentTimeMillis();
		return new java.util.Date(currentTime);
	}











	public static java.sql.Date converUtilTOSql(java.util.Date date)
	{
		java.sql.Date d = java.sql.Date.valueOf(date.toString());
		return d;
	}








	public static java.util.Date converSqlTOUtil(java.util.Date date)
	{
		return date;
	}








	public static String getGender(String iDCard)
	{
		int gender = 3;
		System.out.print(iDCard);
		if (iDCard.length() == 15) {
			gender = new Integer(iDCard.substring(14, 15)).intValue() % 2;
		} else if (iDCard.length() == 18) {
			int number17 = new Integer(iDCard.substring(16, 17)).intValue();
			gender = number17 % 2;
		}
		if (gender == 1)
			return "1";
		if (gender == 0) {
			return "2";
		}
		return "";
	}













	public static boolean verityDate(int yyyy, int MM, int dd)
	{
		boolean flag = false;

		if ((MM >= 1) && (MM <= 12) && (dd >= 1) && (dd <= 31)) {
			if ((MM == 4) || (MM == 6) || (MM == 9) || (MM == 11)) {
				if (dd <= 30)
					flag = true;
			} else if (MM == 2) {
				if (((yyyy % 100 != 0) && (yyyy % 4 == 0)) || (yyyy % 400 == 0)) {
					if (dd <= 29)
						flag = true;
				} else if (dd <= 28) {
					flag = true;
				}
			} else {
				flag = true;
			}
		}
		return flag;
	}







	public static String month2YearMonth(String s)
	{
		String s1 = "";
		if ((s == null) || ("0".equals(s)) || ("".equals(s.trim())))
			return "0月";
		int i = Integer.parseInt(s);
		int j = i / 12;
		int k = i % 12;
		if (j > 0)
			s1 = j + "年";
		if (k > 0)
			s1 = s1 + k + "个月";
		return s1;
	}


	public static String getCurrentYearMonth()
	{
		Calendar calendar = Calendar.getInstance();
		String s = new Integer(calendar.get(1)).toString();
		String s1 = null;
		if (calendar.get(2) < 9) {
			s1 = "0" + new Integer(calendar.get(2) + 1).toString();
		} else
			s1 = new Integer(calendar.get(2) + 1).toString();
		return s + s1;
	}


	public static long calcSeconds(String startDate, String endDate) throws ParseException {
		String format = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat sf = new SimpleDateFormat(format);
		java.util.Date sDate = sf.parse(startDate);
		java.util.Date eDate = sf.parse(endDate);
		return (sDate.getTime() - eDate.getTime()) / 1000L;
	}







	public static String formatDuring(long mss)
	{
		long days = mss / 86400000L;
		long hours = mss % 86400000L / 3600000L;
		long minutes = mss % 3600000L / 60000L;
		long seconds = mss % 60000L / 1000L;
		return days + " 天 " + hours + " 小时 " + minutes + " 分 " + seconds + 
				" 秒 ";
	}










	public static String formatDuring(java.util.Date begin, java.util.Date end)
	{
		if ((begin == null) || (end == null)) {
			return "";
		}
		return formatDuring(end.getTime() - begin.getTime());
	}








	public static java.util.Date convertDate(String adateStrteStr, String format)
	{
		java.util.Date date = null;
		try {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
			date = simpleDateFormat.parse(adateStrteStr);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return date;
	}








	public static String weekOfYear(int s)
	{
		Calendar cal = Calendar.getInstance();
		cal.add(6, s * 7);

		int dayWeek = cal.get(7);
		if (1 == dayWeek) {
			cal.add(5, -1);
		}
		int weekYear = cal.get(3);
		int year = cal.get(1);
		if (weekYear > 9) {
			return year + weekYear + "";
		}
		if ((1 == weekYear) && (11 == cal.get(2))) {
			return year + 1 + "0" + weekYear;
		}
		return year + "0" + weekYear;
	}




	public static java.util.Date getFirstDayOfMonth(java.util.Date date)
	{
		Calendar firstDate = Calendar.getInstance();
		firstDate.setTime(date);
		firstDate.set(5, 1);
		return firstDate.getTime();
	}


	public static java.util.Date getDefaultDay(java.util.Date date)
	{
		Calendar lastDate = Calendar.getInstance();
		lastDate.setTime(date);
		lastDate.set(5, 1);
		lastDate.add(2, 1);
		lastDate.add(5, -1);
		return lastDate.getTime();
	}







	public static String[] weeks(String weekofday)
	{
		String[] weeks = new String[7];
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.set(1, Integer.parseInt(weekofday.substring(0, 4)));
		cal.set(3, 
				Integer.parseInt(weekofday.substring(4, 6)));
		int day = cal.get(7);
		cal.setFirstDayOfWeek(2);
		cal.add(6, cal.getFirstDayOfWeek() - day);
		weeks[0] = sdf.format(cal.getTime());
		cal.add(6, 1);
		weeks[1] = sdf.format(cal.getTime());
		cal.add(6, 1);
		weeks[2] = sdf.format(cal.getTime());
		cal.add(6, 1);
		weeks[3] = sdf.format(cal.getTime());
		cal.add(6, 1);
		weeks[4] = sdf.format(cal.getTime());
		cal.add(6, 1);
		weeks[5] = sdf.format(cal.getTime());
		cal.add(6, 1);
		weeks[6] = sdf.format(cal.getTime());
		return weeks;
	}







	public static String weekinQuarterly(String weekofday)
	{
		Calendar cal = Calendar.getInstance();
		cal.set(1, Integer.parseInt(weekofday.substring(0, 4)));
		cal.set(3, 
				Integer.parseInt(weekofday.substring(4, 6)));
		int day_of_week = cal.get(7) - 1;
		if (day_of_week == 0)
			day_of_week = 7;
		cal.add(5, -day_of_week + 1);
		String mondayinQuarterly = getQuarterly(cal.getTime());
		cal.add(5, 6);
		String sundayinQuarterly = getQuarterly(cal.getTime());
		if (mondayinQuarterly.equals(sundayinQuarterly)) {
			return mondayinQuarterly;
		}
		return mondayinQuarterly + "," + sundayinQuarterly;
	}






	public static int getDayOfWeek()
	{
		Calendar cal = Calendar.getInstance();
		cal.setFirstDayOfWeek(2);
		int tmp = cal.get(7) - 1;
		if (tmp == 0) {
			tmp = 7;
		}
		return tmp;
	}










	public static String getQuarterly()
	{
		Calendar cal = Calendar.getInstance();
		int month = cal.get(2);
		return String.valueOf(cal.get(1) + (month + 3) / 3 );
	}








	public static String getQuarterly(java.util.Date date)
	{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int month = cal.get(2);
		return  String.valueOf(cal.get(1) + (month + 3) / 3);
	}







	public static boolean isWeek(java.util.Date date)
	{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		if ((cal.get(7) == 1) || 
				(cal.get(7) == 7)) {
			return false;
		}
		return true;
	}











	public static String dateToString(java.util.Date d, String format)
	{
		if (d == null) {
			return "";
		}
		Hashtable h = new Hashtable();
		String javaFormat = new String();
		String s = format.toLowerCase();
		if (s.indexOf("yyyy") != -1) {
			h.put(new Integer(s.indexOf("yyyy")), "yyyy");
		} else if (s.indexOf("yy") != -1) {
			h.put(new Integer(s.indexOf("yy")), "yy");
		}
		if (s.indexOf("mm") != -1) {
			h.put(new Integer(s.indexOf("mm")), "MM");
		}

		if (s.indexOf("dd") != -1) {
			h.put(new Integer(s.indexOf("dd")), "dd");
		}
		if (s.indexOf("hh24") != -1) {
			h.put(new Integer(s.indexOf("hh24")), "HH");
		}
		if (s.indexOf("mi") != -1) {
			h.put(new Integer(s.indexOf("mi")), "mm");
		}
		if (s.indexOf("ss") != -1) {
			h.put(new Integer(s.indexOf("ss")), "ss");
		}

		int intStart = 0;
		while (s.indexOf("-", intStart) != -1) {
			intStart = s.indexOf("-", intStart);
			h.put(new Integer(intStart), "-");
			intStart++;
		}

		intStart = 0;
		while (s.indexOf("/", intStart) != -1) {
			intStart = s.indexOf("/", intStart);
			h.put(new Integer(intStart), "/");
			intStart++;
		}

		intStart = 0;
		while (s.indexOf(" ", intStart) != -1) {
			intStart = s.indexOf(" ", intStart);
			h.put(new Integer(intStart), " ");
			intStart++;
		}

		intStart = 0;
		while (s.indexOf(":", intStart) != -1) {
			intStart = s.indexOf(":", intStart);
			h.put(new Integer(intStart), ":");
			intStart++;
		}

		if (s.indexOf("年") != -1) {
			h.put(new Integer(s.indexOf("年")), "年");
		}
		if (s.indexOf("月") != -1) {
			h.put(new Integer(s.indexOf("月")), "月");
		}
		if (s.indexOf("日") != -1) {
			h.put(new Integer(s.indexOf("日")), "日");
		}
		if (s.indexOf("时") != -1) {
			h.put(new Integer(s.indexOf("时")), "时");
		}
		if (s.indexOf("分") != -1) {
			h.put(new Integer(s.indexOf("分")), "分");
		}
		if (s.indexOf("秒") != -1) {
			h.put(new Integer(s.indexOf("秒")), "秒");
		}

		int i = 0;
		while (h.size() != 0) {
			Enumeration e = h.keys();
			int n = 0;
			while (e.hasMoreElements()) {
				i = ((Integer)e.nextElement()).intValue();
				if (i >= n) {
					n = i;
				}
			}
			String temp = (String)h.get(new Integer(n));
			h.remove(new Integer(n));

			javaFormat = temp + javaFormat;
		}
		SimpleDateFormat df = new SimpleDateFormat(javaFormat, 
				new DateFormatSymbols());

		return df.format(d);
	}








	public static boolean isCompareTime(String a, String b, String n)
	{
		int ah = Integer.parseInt(a.split(":")[0]);
		int am = Integer.parseInt(a.split(":")[1]);
		int bh = Integer.parseInt(b.split(":")[0]);
		int bm = Integer.parseInt(b.split(":")[1]);

		if ((n.indexOf("=") >= 0) && (ah == bh) && (am == bm)) {
			return true;
		}
		if ((n.indexOf(">") >= 0) && (n.indexOf("<") < 0)) {
			if ((ah > bh) || ((ah == bh) && (am > bm))) {
				return true;
			}
		} else if ((n.indexOf(">") < 0) && (n.indexOf("<") >= 0) && (
				(ah < bh) || ((ah == bh) && (am < bm)))) {
			return true;
		}

		return false;
	}
	
	public static boolean numberVerify(String s) {
//		return Pattern.compile("^[0-9]*$").matcher(s).matches();
		
		return s.matches("^[0-9]*$");
		
	}


	public static java.util.Date converToDate(String s)
	{
		if ((s == null) || (s.equals(""))) {
			return null;
		}
		if (s.length() == 6) {
			s = s + "01";
		}
		int sstemp;
		int mmtemp;
		int HHtemp; int ddtemp; int MMtemp; int yyyytemp;
		String HH = "00";String mm = "00";String ss = "00";
		int len = s.length();
		String dd; String yyyy; String MM;
	

//		if ((len == 8) && (CommonVerify.numberVerify(s))) {
		if ((len == 8) && (numberVerify(s))) {
			yyyy = s.substring(0, 4);
			MM = s.substring(4, 6);
			dd = s.substring(6, 8);
		} else if (len == 14) {
			yyyy = s.substring(0, 4);
			MM = s.substring(4, 6);
			dd = s.substring(6, 8);
			HH = s.substring(8, 10);
			mm = s.substring(10, 12);
			ss = s.substring(12, 14);
		} else {
			String val = "-";
			if (s.indexOf("/") >= 0) {
				val = "/";
			}

			yyyy = s.substring(0, s.indexOf(val));
			MM = s.substring(s.indexOf(val) + 1, s.lastIndexOf(val));
			String temp = s.substring(s.lastIndexOf(val) + 1, s.length());
			if (temp.indexOf(" ") > 0)
			{
				dd = temp.substring(0, temp.indexOf(" "));
				temp = temp.substring(temp.indexOf(" ") + 1, temp.length());
				HH = temp.substring(0, temp.indexOf(":"));
				mm = temp.substring(temp.indexOf(":") + 1, temp
						.lastIndexOf(":"));
				ss = temp.substring(temp.lastIndexOf(":") + 1, temp.length());
				if (ss.indexOf(".") > 0) {
					ss = ss.substring(0, ss.lastIndexOf("."));
				}
			} else {
				dd = temp;
			}
		}





		try
		{
			yyyytemp = Integer.parseInt(yyyy);
			MMtemp = Integer.parseInt(MM);
			ddtemp = Integer.parseInt(dd);
			HHtemp = Integer.parseInt(HH);
			mmtemp = Integer.parseInt(mm);
			sstemp = Integer.parseInt(ss);
		} catch (RuntimeException e) { 
		throw new RuntimeException("日期格式错误"); }

		 return getDate(yyyytemp, MMtemp, ddtemp, HHtemp, mmtemp, sstemp);
	}









	public static String getSystemCurrentTime(String type)
	{
		Calendar calendar = Calendar.getInstance();


		Object obj = null;
		java.util.Date date = calendar.getTime();
		return converToString(date, type);
	}




















	public static String converToString(java.util.Date dt, String type)
	{
		String returnStr = null;


		if (dt == null) {
			return null;
		}


		type = StringUtils.StringReplace("YYYY", "yyyy", type);
		type = StringUtils.StringReplace("DD", "dd", type);
		type = StringUtils.StringReplace("SS", "ss", type);
		type = StringUtils.StringReplace("hh24", "HH", type);
		type = StringUtils.StringReplace("HH24", "HH", type);
		type = StringUtils.StringReplace("MI", "mm", type);
		type = StringUtils.StringReplace("mi", "mm", type);

		if ((type == null) || (type.trim().equals(""))) {
			returnStr = DateFormat.getDateTimeInstance().format(dt);
		} else {
			SimpleDateFormat f = new SimpleDateFormat(type);
			returnStr = f.format(dt);
		}
		return returnStr;
	}














	public static String converToString(String s, int type)
			throws AppException
	{
		String strRet = null;
		int yyyy; 
		int MM = 0;


		if ((s == null) || (s.equals(""))) {
			return null;
		}
		switch (type) {
		case 1: 
			try {
				strRet = 

						s.substring(0, 4) + "-" + s.substring(4, 6) + "-" + s.substring(6, 8) + " " + s.substring(8, 10) + ":" + s.substring(10, 12) + ":" + s.substring(12, 14);
			} catch (Exception e) {
				throw new AppException(100205000, 
						"不合法的时间字符串(正确格式应该为yyyyMMddHHmmss)");
			}
		case 2: 
			try
			{
				strRet = 
						s.substring(0, 4) + s.substring(5, 7) + s.substring(8, 10);
			} catch (Exception e) {
				throw new AppException(100205000, 
						"不合法的时间字符串(正确格式应该为yyyy-MM-dd)");
			}


		case 3: 
			try
			{
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date  oneDay = format.parse(s);
				
				 
//				java.util.Date oneDay = TypeCast.stringToDate(s, "", true);
				Calendar ca = Calendar.getInstance();
				ca.clear();
				ca.setTime(oneDay);
				yyyy = ca.get(1);
				MM = ca.get(2) + 1;
			} catch (Exception e) { 
				throw new AppException(100205000, 
						"不合法的时间字符串(正确格式应该为yyyy-MM-dd)"); }
			if ((yyyy < 1000) || (yyyy > 9999))
				throw new AppException(100205000, 
						"错误的年份");
			if (MM < 10) {
				strRet = "0" + MM;
			} else {
				strRet = MM + "";
			}
			strRet = yyyy + strRet;
			break;
		default: 
			strRet = s;
		}
		return strRet;
	}














	public static String converToString(String dt, String type)
	{
		java.util.Date oneDay = converToDate(dt);
		if (oneDay == null) return "";
		return converToString(oneDay, type);
	}









	public static String addDay(String data)
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cd = Calendar.getInstance();
		try {
			cd.setTime(sdf.parse(data));
			cd.add(5, 1);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return sdf.format(cd.getTime());
	}


	public static String addDay(int add) { SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	Calendar cd = Calendar.getInstance();
	cd.setTime(new java.util.Date());
	cd.add(5, add);
	return sdf.format(cd.getTime());
	}


	public static String addDay(String data, int add) { SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	Calendar cd = Calendar.getInstance();
	try {
		cd.setTime(sdf.parse(data));
		cd.add(5, add);
	} catch (ParseException e) {
		e.printStackTrace();
	}

	return sdf.format(cd.getTime());
	}


	public static java.util.Date getAfterDate(java.util.Date date, int amount) { Calendar cal = Calendar.getInstance();
	cal.setTime(date);
	cal.add(5, amount);
	return cal.getTime();
	}


	public static int getMonthDay(int year, int month) { return getMonthDayByYear(year)[(--month)]; }


	public static int[] getMonthDayByYear(int year) {
		int[] monthDay = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
			monthDay[1] += 1;
		return monthDay;
	}


	public static long[] dateDiff(String startTime, String endTime) { return dateDiff(startTime, endTime, "yyyy-MM-dd"); }


	public static long[] dateDiff(String startTime, String endTime, String format) {
		SimpleDateFormat sd = new SimpleDateFormat(format);

		long nd = 86400000L;

		long nh = 3600000L;

		long nm = 60000L;

		long ns = 1000L;

		long[] date = new long[4];
		try {
			long diff = sd.parse(endTime).getTime() - sd.parse(startTime).getTime();

			long day = diff / nd;
			long hour = diff % nd / nh;
			long min = diff % nd % nh / nm;
			long sec = diff % nd % nh % nm / ns;

			date[0] = day;
			date[1] = hour;
			date[2] = min;
			date[3] = sec;
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return date;
	}


	public static java.util.Date parseDate(String dateStr, String format) { java.util.Date date = null;
	try {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);

		date = dateFormat.parse(dateStr);
	}
	catch (Exception localException) {}
	return date;
	}


	public static String formatDate(String dateStr, String format, String toFormat) { return format(parseDate(dateStr, format), toFormat); }


	public static java.util.Date parseDate(String dateStr) {
		return parseDate(dateStr, "yyyy-MM-dd");
	}


	public static String getCurrentDateTime() { return format(new java.util.Date(), "yyyy-MM-dd HH:mm:ss"); }


	public static String format(java.util.Date date, String format) {
		String result = "";
		try {
			if (date != null) {
				DateFormat dateFormat = new SimpleDateFormat(format);
				result = dateFormat.format(date);
			}
		}
		catch (Exception localException) {}
		return result;
	}


	public static String format(java.util.Date date) { return format(date, "yyyy-MM-dd"); }


	public static int getYear(java.util.Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(1);
	}


	public static int getMonth(java.util.Date date) { Calendar calendar = Calendar.getInstance();
	calendar.setTime(date);
	return calendar.get(2) + 1;
	}


	public static int getDay(java.util.Date date) { Calendar calendar = Calendar.getInstance();
	calendar.setTime(date);
	return calendar.get(5);
	}


	public static int getHour(java.util.Date date) { Calendar calendar = Calendar.getInstance();
	calendar.setTime(date);
	return calendar.get(11);
	}


	public static int getMinute(java.util.Date date) { Calendar calendar = Calendar.getInstance();
	calendar.setTime(date);
	return calendar.get(12);
	}


	public static int getSecond(java.util.Date date) { Calendar calendar = Calendar.getInstance();
	calendar.setTime(date);
	return calendar.get(13);
	}


	public static long getMillis(java.util.Date date) { Calendar calendar = Calendar.getInstance();
	calendar.setTime(date);
	return calendar.getTimeInMillis();
	}


	public static String getNow() {
		return getDate(new java.util.Date());
	}


	public static String getDate(java.util.Date date) { return format(date, "yyyy-MM-dd"); }


	public static String getTime(java.util.Date date) {
		return format(date, "HH:mm:ss");
	}


	public static String getDateTime(java.util.Date date) { return format(date, "yyyy-MM-dd HH:mm:ss"); }


	public static java.util.Date addDate(java.util.Date date, int day) {
		Calendar calendar = Calendar.getInstance();
		long millis = getMillis(date) + day * 24L * 3600L * 1000L;
		calendar.setTimeInMillis(millis);
		return calendar.getTime();
	}


	public static long diffDate(java.util.Date date, java.util.Date date1) { return (getMillis(date) - getMillis(date1)) / 86400000L; }


	public static String getMonthBegin(String strdate) {
		java.util.Date date = parseDate(strdate);
		return format(addDate(null, 0), "yyyy-MM") + "-01";
	}


	public static String getMonthEnd(String strdate) { java.util.Date date = parseDate(getMonthBegin(strdate));
	Calendar calendar = Calendar.getInstance();
	calendar.setTime(date);
	calendar.add(2, 1);
	calendar.add(6, -1);
	return formatDate(calendar.getTime());
	}


	public static String formatDate(java.util.Date date) { return formatDateByFormat(date, "yyyy-MM-dd"); }


	public static String formatDateByFormat(java.util.Date date, String format) {
		String result = "";
		if (date != null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat(format);
				result = sdf.format(date);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}


	public static final int getCurrentDayOfWeek() { return Calendar.getInstance().get(7) - 1; }








	public static String getDateStr()
	{
		SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmss");
		String Str = fmt.format(new java.util.Date());
		return Str;
	}
	
	
	
	public static void main(String[] args) {
		System.out.println(numberVerify("12325a915"));
	}
	
}

/* Location:           D:\m2_yth\repository\com\zjtzsw\j1\j1-frame-beta\1.1.1\j1-frame-beta-1.1.1.jar
 * Qualified Name:     com.tzsw.core.util.DateUtil
 * Java Class Version: 7 (51.0)
 * JD-Core Version:    0.7.0.1
 */