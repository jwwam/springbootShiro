/**
 * Copyright &copy; 2012-2013 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.springboot.demo.base.utils;

import java.util.Collection;
import java.util.HashSet;

import org.apache.shiro.authz.AuthorizationInfo;

public class CacheUntil {
	
	private static Collection<String> set = new HashSet<String>();
	
	public static void setCacheTree(AuthorizationInfo ai){
		   set = ai.getStringPermissions();
		   System.out.println(ai.getStringPermissions().size());
	}
	
	
	public static Collection<String> getCacheTree(){
		return set;
	}
}
