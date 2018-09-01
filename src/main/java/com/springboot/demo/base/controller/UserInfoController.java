package com.springboot.demo.base.controller;

import java.util.*;

import com.springboot.demo.base.entity.SysRole;
import com.springboot.demo.base.entity.UserInfo;
import com.springboot.demo.base.service.UserInfoService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.springboot.demo.base.common.DataTablesParam;
import com.springboot.demo.base.utils.BuildPageRequest;
import com.springboot.demo.base.utils.StateParameter;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

@Controller
@RequestMapping("/userInfo")
public class UserInfoController extends BaseController {

	@Autowired
	UserInfoService userInfoService;

    /**
     * 用户查询.
     * @return
     */
    @RequestMapping("/userView")
    @RequiresPermissions("userInfo:view")//权限管理;
    public String view(){

    	logger.info("加载userInfo....");
        return "/base/userInfo";
    }

    /**
     * 获取用户列表
     * @param dataTablesParam
     * @param username
     * @return
     */
    @RequestMapping(value="/userList",method = RequestMethod.POST)
    @ResponseBody
    @RequiresPermissions("userInfo:view")//权限管理;
    public ModelMap getList(DataTablesParam dataTablesParam, String username){
    	logger.info("权限管理列表："+username);
        ModelMap map= new ModelMap();
        Page<UserInfo> pageRe=null;
        try {
            if("".equals(username)){
                pageRe= userInfoService.findAll(BuildPageRequest.getPageRequest(dataTablesParam.getPageNum(), dataTablesParam.getiDisplayLength(), Sort.Direction.DESC, "uid"));
            }else{
                pageRe= userInfoService.findByUserName(username, BuildPageRequest.getPageRequest(dataTablesParam.getPageNum(), dataTablesParam.getiDisplayLength(), Sort.Direction.DESC, "id"));
            }
        	JsonConfig config = new JsonConfig(); 
    		//忽视loginPermissionInfo、roleInfoList数组【不添加此项json解析会报错】 
    		config.setExcludes(new String[]{"roleList"}); 
    		JSONArray json =JSONArray.fromObject(pageRe.getContent(),config);
            map.put("sEcho", dataTablesParam.getsEcho());
            map.put("iTotalRecords", pageRe.getTotalElements());
            map.put("iTotalDisplayRecords",pageRe.getTotalElements());
            map.put("aaData", json );
        }catch (Exception e){
            e.printStackTrace();
        }
    	return map;
    }

    /**
     * 用户添加;
     * @return
     */
    @RequestMapping("/userAdd")
    @RequiresPermissions("userInfo:add")//权限管理;
    @ResponseBody
    public ModelMap userInfoAdd(UserInfo ui){
    	logger.info("添加客户："+ui.getName() );
    	UserInfo result = null;
    	result = userInfoService.save(ui);
    	if( result!=null ){
    		return getModelMap(StateParameter.SUCCESS,result,"添加客户成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"添加客户失败");
    	}
       
    }

	/**
	 * 用户注册;
	 * @return
	 */
	@RequestMapping("/regest")
	@ResponseBody
	public ModelMap regest(UserInfo ui){
		logger.info("客户注册："+ui.getName() );
		UserInfo uis = userInfoService.findByUsername(ui.getUsername());
		if(uis!=null){
			return getModelMap(StateParameter.FAULT,"","注册失败，该账号已存在");
		}
		UserInfo result = null;
		result = userInfoService.save(ui);
		if( result!=null ){
			SecurityUtils.getSubject().getSession().setAttribute("user", result);
			return getModelMap(StateParameter.SUCCESS,result,"注册成功");
		}else{
			return getModelMap(StateParameter.FAULT,null,"注册失败");
		}

	}

    /**
     * 用户更新
     * @return
     */
    @RequestMapping("/updateUser")
    @RequiresPermissions("userInfo:upate")//权限管理;
    @ResponseBody
    public ModelMap updateUser(UserInfo ui){
    	logger.info("更新客户："+ui.getName() );
		try {
			userInfoService.updateUserInfo(ui);
			return getModelMap(StateParameter.SUCCESS,ui,"更新客户信息成功");
		} catch (Exception e) {
			e.printStackTrace();
			return getModelMap(StateParameter.FAULT,null,"更新客户信息失败");
		}

	}

    /**
     * 用户禁用或启用;
     * @return
     */
    @RequestMapping("/updateState")
    @ResponseBody
    @RequiresPermissions("userInfo:del")//权限管理;
    public ModelMap updateState(int state,String uid){

		int result = userInfoService.updateState(state, uid);
    	if( result > 0 ){
    		return getModelMap(StateParameter.SUCCESS,result,"操作成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"操作失败");
    	}
    }
    
    /**
     * 修改密码
     * @return
     */
    @RequestMapping("/updatePassword")
    @ResponseBody
    //@RequiresPermissions("userInfo:upate")//权限管理;
    public ModelMap updatePassword(String password,String uid){
    	Date updateDate = new Date();
    	int result = userInfoService.updatePassword(password, updateDate, uid);
    	if( result == 1 ){
    		return getModelMap(StateParameter.SUCCESS,result,"操作成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"操作失败");
    	}
    }

    /**
     * 通过uid查询客户信息
     * @return
     */
    @RequestMapping("/findByOne")
    @ResponseBody
    public ModelMap findByOne(Integer uid){
    	logger.info("查询客户信息："+uid);
    	UserInfo result = userInfoService.findByOne(uid);
    	if( result != null ){
    		JsonConfig config = new JsonConfig(); 
    		config.setExcludes(new String[]{"roleList"}); 
    		JSONObject json =JSONObject.fromObject(result,config);
    		return getModelMap(StateParameter.SUCCESS,json,"操作成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"操作失败");
    	}
    }
    
    public JSONObject JsonObjectConfig(String content){
    	
    	JsonConfig config = new JsonConfig(); 
		//忽视loginPermissionInfo、roleInfoList数组【不添加此项json解析会报错】 
		config.setExcludes(new String[]{"roleList"}); 
		JSONObject json =JSONObject.fromObject(content,config);
		return json;
		
    }
    
    /**
     * 通过uid查询客户拥有的角色id
     * @return
     */
    @RequestMapping("/findByRoleId")
    @ResponseBody
    public ModelMap findByRoleId(Integer uid){
    	logger.info("查询客户信息："+uid);
    	try {
    		UserInfo result = userInfoService.findByOne(uid);
        	List<SysRole> list = result.getRoleList();
        	JsonConfig config = new JsonConfig(); 
    		config.setExcludes(new String[]{"permissions","userInfos"}); 
    		JSONArray json =JSONArray.fromObject(list,config);
    		logger.info("拥有角色个数：----------------"+list.size());
        	return getModelMap(StateParameter.SUCCESS,json,"操作成功");
		} catch (Exception e) {
			e.printStackTrace();
			return getModelMap(StateParameter.FAULT,null,"操作失败");
		}
    }

    /**
     * 保存权限id
     * @return
     */
    @RequestMapping("/saveRoleId")
    @ResponseBody
    public ModelMap saveRoleId(String str,Integer uid){
    	logger.info("查询客户信息："+str);
    	try {
    		String [] array = str.split("-");
    		List<SysRole> list = new ArrayList<SysRole>();
    		for (int i = 0; i < array.length; i++) {
    			SysRole sr  = new SysRole();
    			sr.setId( Integer.parseInt(array[i]) );
    			list.add(sr);
			}
    		UserInfo ui = userInfoService.findByOne(uid);
    		ui.setRoleList(list);
    		UserInfo result = userInfoService.saveRoleId(ui);
        	return getModelMap(StateParameter.SUCCESS,result.getUid(),"操作成功");
		} catch (Exception e) {
			e.printStackTrace();
			return getModelMap(StateParameter.FAULT,null,"操作失败");
		}
    }

	public String getUuid(){
		String uuid = UUID.randomUUID().toString(); //获取UUID并转化为String对象
		uuid = uuid.replace("-", "");
		return uuid;
	}

}

