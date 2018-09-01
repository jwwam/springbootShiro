package com.springboot.demo.base.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.springboot.demo.base.entity.UserInfo;
import com.springboot.demo.base.utils.StateParameter;

import net.sf.json.JSONArray;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/home")
public class HomeController extends BaseController{

    @RequestMapping("/view")
    public String index(HttpServletResponse response){

		UserInfo ui = this.getCurrentUser();
		if( ui == null ){
			try {
				response.sendRedirect("../login");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
    	logger.info("初始化home页面....");
        return"/base/home";
        
    }

	//@RequestMapping("/welcome")
	@RequestMapping(value="/welcome",method = RequestMethod.POST)
	public String welcome(){

		logger.info("welcome....");
		return"/base/welcome";

	}

	 /**
     * 获取客户权限资源树列表;
     * @return
     */
    @RequestMapping("/getTree")
    //@RequiresPermissions("userInfo:add")//权限管理;
    @ResponseBody
    public ModelMap getTree(){
    	UserInfo ui = this.getCurrentUser();
    	if( ui == null ){
    		logger.info("当前登录用户：null");
    	}
    	logger.info("当前登录用户："+ ui.getName());
    	JSONArray json = this.getCurrentUserPermission(ui);
    	return getModelMap(StateParameter.SUCCESS,json,"操作成功");
    }
    


}