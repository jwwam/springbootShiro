package com.springboot.demo.base.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.springboot.demo.base.entity.SysPermission;
import com.springboot.demo.base.entity.SysRole;
import com.springboot.demo.base.entity.UserInfo;
import com.springboot.demo.base.service.SysPermissionService;
import com.springboot.demo.base.service.SysRoleService;
import com.springboot.demo.base.utils.BuildPageRequest;
import com.springboot.demo.base.utils.StateParameter;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;



@Controller
@RequestMapping("/roleInfo")
public class SysRoleController extends BaseController {
	
 
	@Autowired
	SysRoleService sysRoleService;
	
	@Autowired
	SysPermissionService sysPermissionService;
    /**
     * 角色查询.
     * @return
     */
    @RequestMapping("/roleView")
    @RequiresPermissions("roleInfo:view")//权限管理;
    public String view(){
    	
    	logger.info("加载roleInfo....");
        return "/base/roleInfo";
    }

 
    
    /**
     * 获取角色列表
     * @param dataTablesParam
     * @return
     */
    @RequestMapping(value="/roleList",method = RequestMethod.POST)
    @ResponseBody
    //@RequiresPermissions("userInfo:view")//权限管理;
    public ModelMap getList(DataTablesParam dataTablesParam, String role){
    	logger.info("角色管理列表："+role);
        ModelMap map= new ModelMap();
        Page<SysRole> pageRe=null;
        try {
            if("".equals(role)){
                pageRe= sysRoleService.findAll(BuildPageRequest.getPageRequest(dataTablesParam.getPageNum(), dataTablesParam.getiDisplayLength(), Sort.Direction.DESC, "id"));
            }else{
                pageRe= sysRoleService.findByRole(role, BuildPageRequest.getPageRequest(dataTablesParam.getPageNum(), dataTablesParam.getiDisplayLength(), Sort.Direction.DESC, "id"));
            }
        	JsonConfig config = new JsonConfig(); 
    		config.setExcludes(new String[]{"permissions","userInfos"}); 
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
     * 角色添加;
     * @return
     */
    @RequestMapping("/sysRoleAdd")
    //@RequiresPermissions("userInfo:add")//权限管理;
    @ResponseBody
    public ModelMap sysRoleAdd(SysRole sr){
    	logger.info("添加："+sr.getRole());
    	SysRole result = null;
    	result = sysRoleService.save(sr);
    	if( result!=null ){
    		return getModelMap(StateParameter.SUCCESS,result,"添加角色成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"添加角色失败");
    	}
       
    }
    
    /**
     * 角色角色
     * @return
     */
    @RequestMapping("/updateRole")
    //@RequiresPermissions("userInfo:add")//权限管理;
    @ResponseBody
    public ModelMap updateRole(SysRole sr){
    	logger.info("更新："+ sr.getRole() );
    	logger.info("更新："+ sr.getId());
    	logger.info("更新："+ sr.getDescription());
    	int result = sysRoleService.updateRole(sr);
    	if( result > 0 ){
    		return getModelMap(StateParameter.SUCCESS,result,"更新角色信息成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"更新角色信息失败");
    	}
       
    }

    /**
     * 角色禁用或启用;
     * @return
     */
    @RequestMapping("/updateState")
    @ResponseBody
    //@RequiresPermissions("userInfo:upate")//权限管理;
    public ModelMap updateState(Boolean available,String id){
    	
    	int result = sysRoleService.updateState(available, id);
    	if( result == 1 ){
    		return getModelMap(StateParameter.SUCCESS,result,"操作成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"操作失败");
    	}
    }
    
    
    /**
     * 通过uid查询角色信息
     * @return
     */
    @RequestMapping("/findByOne")
    @ResponseBody
    public ModelMap findByOne(String id){
    	logger.info("查询角色角色信息："+id);
    	SysRole result = sysRoleService.findByOne(id);
    	if( result != null ){
    		JsonConfig config = new JsonConfig(); 
    		config.setExcludes(new String[]{"permissions","userInfos"}); 
    		JSONObject json =JSONObject.fromObject(result,config);
    		return getModelMap(StateParameter.SUCCESS,json,"操作成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"操作失败");
    	}
    }
    
    /**
     * 角色更新
     * @return
     */
    @RequestMapping("/findAll")
    //@RequiresPermissions("userInfo:add")//权限管理;
    @ResponseBody
    public ModelMap findAll(String id){
   
    	List<SysRole> list= sysRoleService.findAll();
    	if( list.size() > 0 ){
    		JsonConfig config = new JsonConfig(); 
    		config.setExcludes(new String[]{"permissions","userInfos"}); 
    		JSONArray json =JSONArray.fromObject(list,config);
    		return getModelMap(StateParameter.SUCCESS,json,"查询角色信息成功");
    	}else{
    		return getModelMap(StateParameter.FAULT,null,"查询角色信息失败");
    	}
       
    }
    
    
    
    /**
     * 通过uid查询角色信息
     * @return
     */
    @RequestMapping(value="/findBypermission",method = RequestMethod.POST)
    @ResponseBody
    public ModelMap findBypermission(String id){
    	logger.info("查询角色拥有资源："+id);
    	SysRole result = sysRoleService.findByOne(id);
    	if( result == null ){
    		return getModelMap(StateParameter.FAULT,null,"操作失败");
    	}
    	List<SysPermission> list = result.getPermissions();
    	JsonConfig config = new JsonConfig(); 
		config.setExcludes(new String[]{"roles"}); 
		JSONArray json =JSONArray.fromObject(list,config);
    	return getModelMap(StateParameter.SUCCESS,json,"操作成功");
    }
    
    

    
    /**
     * 保存角色权限资源
     * @return
     */
    @RequestMapping(value="/savePermissionId",method = RequestMethod.POST)
    @ResponseBody
    public ModelMap savePermissionId(String id,String str){
    	logger.info("保存角色资源："+str);
    	try {
    		String [] array = str.split("-");
    		List<SysPermission> list = new ArrayList<SysPermission>();
    		for (int i = 0; i < array.length; i++) {
    			SysPermission sr  = new SysPermission();
    			sr.setId( Integer.parseInt(array[i]) );
    			list.add(sr);
			}
    		SysRole sr = sysRoleService.findByOne(id);
    		sr.setPermissions(list);
    		SysRole result = sysRoleService.save(sr);
        	return getModelMap(StateParameter.SUCCESS,result.getId(),"操作成功");
		} catch (Exception e) {
			e.printStackTrace();
			return getModelMap(StateParameter.FAULT,null,"操作失败");
		}
    }



	/**
	 * 通过id查询角色是否可以查询所有
	 * @return
	 */
	@RequestMapping(value="/getAllData",method = RequestMethod.POST)
	@ResponseBody
	@RequiresPermissions("roleInfo:getAllData")//权限管理;
	public ModelMap getAllData(String id){
		logger.info("查询角色拥有资源："+id);
		return getModelMap(StateParameter.SUCCESS,null,"操作成功");
	}


}