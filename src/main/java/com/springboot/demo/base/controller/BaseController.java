package com.springboot.demo.base.controller;

import com.springboot.demo.base.entity.SysPermission;
import com.springboot.demo.base.entity.SysRole;
import com.springboot.demo.base.entity.UserInfo;
import com.springboot.demo.base.utils.SortList;
import com.springboot.demo.base.utils.StateParameter;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public abstract class BaseController{

	protected final String success = StateParameter.SUCCESS;
	protected final String  fail = StateParameter.FAULT;

	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

	public ModelMap getModelMap(String status,Object data,String msg){
		ModelMap modelMap=new ModelMap();
		modelMap.put("status", status);
		modelMap.put("data", data);
		modelMap.put("msg", msg);
		return modelMap;
		
	}

	public String getUuid(){
		String uuid = UUID.randomUUID().toString(); //获取UUID并转化为String对象
		uuid = uuid.replace("-", "");
		return uuid;
	}

	/**
	 * 获取当前登录的用户角色
	 * */
	public UserInfo getCurrentUser(){
		UserInfo currentUserId = (UserInfo) SecurityUtils.getSubject().getSession().getAttribute("user");
		return currentUserId;
	}

	public JSONArray getCurrentUserPermission(UserInfo ui){

		List<SysPermission> allList = new ArrayList<SysPermission>();
		List<SysRole> srList= ui.getRoleList();
		for (SysRole sysRole : srList) {
			allList.addAll(sysRole.getPermissions());
		}
		System.out.println("------处理资源树前--------------:"+allList.size());
		List<SysPermission> newAllList = new ArrayList<SysPermission>();
		for (SysPermission sysPermission : allList) {

			if(sysPermission.getAvailable()){
				//去除已经禁止的资源(不执行添加功能)
				continue;
			}
			if(sysPermission.getResourceType().equals("menu")){
				if(!newAllList.contains(sysPermission)){
					newAllList.add(sysPermission);
				}

			}else{
				if("roleInfo/getAllData".equals( sysPermission.getUrl() )){
					SecurityUtils.getSubject().getSession().setAttribute("isSearchAllData",true);
				}
			}
		}
		System.out.println("------处理剩余结果后--------------"+newAllList.size());
		//进行list对象某属性排序
		SortList<SysPermission> sortList = new SortList<SysPermission>();
		sortList.Sort(newAllList, "getNumberSort");

		JsonConfig config = new JsonConfig();
		config.setExcludes(new String[]{"roles"});
		JSONArray jsonArray = JSONArray.fromObject(newAllList,config);
		return jsonArray;

	}

}
