package com.springboot.demo.base.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.demo.base.dao.SysPermissionDao;
import com.springboot.demo.base.entity.SysPermission;
import com.springboot.demo.base.entity.SysPermissionVo;
import com.springboot.demo.base.service.SysPermissionService;

@Service
public class SysPermissionServiceImpl implements SysPermissionService {
	protected final Logger logger = LoggerFactory.getLogger(this.getClass());  
    @Autowired
    private SysPermissionDao sysPermissionDao;
	@Override
	public SysPermission findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<SysPermissionVo> findAll() {
		List<SysPermission> list= (List<SysPermission>) sysPermissionDao.findAll();
		List<SysPermissionVo> listVo = new ArrayList<SysPermissionVo>();

		SysPermissionVo root = new SysPermissionVo();
		root.setId(0);
		root.setParent("#");
		root.setText("资源根节点");
		root.setState(true);
		listVo.add(root);
		for (SysPermission sysPermission : list) {
			SysPermissionVo VO = new SysPermissionVo();
			VO.setId(sysPermission.getId());
			VO.setParent(sysPermission.getParentId()+"");
			VO.setText(sysPermission.getName());
			VO.setState(true);
			listVo.add(VO);
		}
		return listVo;
	}

	@Override
	public SysPermission save(SysPermission sp) {
		// TODO Auto-generated method stub
		return sysPermissionDao.save(sp);
	}
	@Override
	public int updatePermission(SysPermission sp) {
		String name = sp.getName();
		String  resourceType = sp.getResourceType();
		String url = sp.getUrl();
		String  permission = sp.getPermission();
		String id = sp.getId()+"";
		boolean state = sp.getAvailable();
		System.out.println(resourceType+"-------------------"+id);
		System.out.println(permission+"-------------------"+url);
		return sysPermissionDao.updatePermission(name, resourceType, url, permission,state, id);
	}
	@Override
	public SysPermission findByOne(String id) {
		int idInt = Integer.parseInt(id);
		return sysPermissionDao.findById(idInt);
	}
	@Override
	public int delete(String id) {
		int idInt = Integer.parseInt(id);
		return sysPermissionDao.delete(idInt);
	}
	
    
}