package com.springboot.demo.base.common;

import com.springboot.demo.base.entity.UserInfo;
import org.apache.shiro.SecurityUtils;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

public  class PermissionUtil  {

	public static boolean isSearchAllData() {

        String isSearch = SecurityUtils.getSubject().getSession().getAttribute("isSearchAllData")+"";
		if("null".equals(isSearch)){
            System.out.println("false");
            return false;
        }else{
            System.out.println("true");
            return true;
        }
	}


    /**
     * 获取当前登录的用户角色
     * */
    public static UserInfo getCurrentUser(){

        UserInfo currentUserId = (UserInfo)SecurityUtils.getSubject().getSession().getAttribute("user");
        return currentUserId;
    }
}
