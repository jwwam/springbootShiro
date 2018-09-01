package com.springboot.demo.controller;

import com.springboot.demo.base.controller.BaseController;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName: StudentController
 * @Auther: zhangyingqi
 * @Date: 2018/8/31 16:20
 * @Description:
 */
@Controller
@RequestMapping(value="/student")
public class StudentController extends BaseController{

    @RequiresPermissions("student:view")
    @RequestMapping(value="/studentView")
    public String view(HttpServletRequest request){
        logger.info("进入student列表页面");
        return "/student/studentList";
    }
}
