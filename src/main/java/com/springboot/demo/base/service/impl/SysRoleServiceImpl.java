package com.springboot.demo.base.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.springboot.demo.base.entity.SysPermission;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.demo.base.dao.SysRoleDao;
import com.springboot.demo.base.entity.SysRole;
import com.springboot.demo.base.entity.UserInfo;
import com.springboot.demo.base.service.SysRoleService;

import javax.transaction.Transactional;

@Service
public class SysRoleServiceImpl implements SysRoleService {
	protected final Logger logger = LoggerFactory.getLogger(this.getClass());  
    @Autowired
    private SysRoleDao sysRoleDao;
	@Override
	public UserInfo findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Page<SysRole> findByRole(String role, Pageable pageable) {
		// TODO Auto-generated method stub
		return sysRoleDao.findByRole(role, pageable);
	}
	@Override
	public Page<SysRole> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return sysRoleDao.findAll(pageable);
	}
	@Override
	@Transactional
	public int updateState(boolean available, String uid) {
		// TODO Auto-generated method stub
		System.out.print("hhhe--------------"+uid);
		int id = Integer.parseInt(uid);
		SysRole sr = sysRoleDao.findById(id);
		sysRoleDao.delete(sr);
		return 1;
	}
	@Override
	public SysRole save(SysRole sr) {
		
		return sysRoleDao.save(sr);
	}
	@Override
	public int updateRole(SysRole sr) {
		// TODO Auto-generated method stub
		String description = sr.getDescription();
		String role = sr.getRole();
		String id = sr.getId()+"";
		return sysRoleDao.updateRole(description, role, id);
	}
	@Override
	public SysRole findByOne(String id) {
		int uid = Integer.parseInt(id);
		return sysRoleDao.findById(uid);
	}
	@Override
	public List<SysRole> findAll() {
		// TODO Auto-generated method stub
		return (List<SysRole>) sysRoleDao.findAll();
	}
}