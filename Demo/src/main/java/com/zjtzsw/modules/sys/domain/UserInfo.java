package com.zjtzsw.modules.sys.domain;

import java.io.Serializable;

public class UserInfo implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private String userID;
    private String userAccount;
    private String userPass;
    private String salt;

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserPass() {
        return userPass;
    }

    public void setUserPass(String userPass) {
        this.userPass = userPass;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Override
    public String toString() {
        return "UserInfo [userID=" + userID + ", userAccount=" + userAccount
                + ", userPass=" + userPass + ", salt=" + salt + "]";
    }


}
