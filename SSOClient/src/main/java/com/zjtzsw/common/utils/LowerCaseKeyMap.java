package com.zjtzsw.common.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class LowerCaseKeyMap
  extends HashMap<String, Object>
{
  private static final long serialVersionUID = 1L;
  
  public Object put(String key, Object value)
  {
    return super.put(key.toLowerCase(), value);
  }
  
  public void putAll(Map<? extends String, ? extends Object> m)
  {
    for (Map.Entry<? extends String, ? extends Object> entry : m.entrySet()) {
      put((String)entry.getKey(), entry.getValue());
    }
  }
}