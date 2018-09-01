package com.springboot.demo.base.service.impl;

import java.util.Date;
import java.util.List;

import com.springboot.demo.base.dao.UserInfoDao;
import com.springboot.demo.base.entity.UserInfo;
import com.springboot.demo.base.service.UserInfoService;
import com.springboot.demo.base.utils.MD5Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class UserInfoServiceImpl implements UserInfoService {
	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserInfoDao userInfoDao;

    @Override
    public UserInfo findByUsername(String username) {
        UserInfo ui = userInfoDao.findByUsername(username);
        return ui;
    }
	@Override
	public Page<UserInfo> findByUserName(String username, Pageable pageable) {
		
		return userInfoDao.findByUserName(username, pageable);
	}
	@Override
	public Page<UserInfo> findAll(Pageable pageable) {
		Page<UserInfo> uis = userInfoDao.findAll(pageable); 
		return uis;
	}

	@Override
	public List<UserInfo> findAll() {
		return userInfoDao.findAll();
	}

	@Override
	public UserInfo save(UserInfo ui) {
	  
		String pas = MD5Utils.encodePassword(ui.getPassword(), ui.getCredentialsSalt());
		ui.setPassword(pas);
		return userInfoDao.save(ui);
	}

	@Override
	public UserInfo saveUser(UserInfo ui) {
		return userInfoDao.save(ui);
	}

	@Override
	public int updateState(int state, String uid) {
		Date updateDate = new Date();
		int result = userInfoDao.updateState(state, updateDate, uid);
		
		return result;
	}
	
	@Override
	public void updateUserInfo(UserInfo ui) {
		userInfoDao.save(ui);
	}

	@Override
	public UserInfo findByOne(Integer uid) {
		return userInfoDao.findByUid(uid);
	}

	@Override
	public int updatePassword(String password, Date updateDate, String uid) {
		// TODO Auto-generated method stub
		int id = Integer.parseInt(uid);
		UserInfo ui = userInfoDao.findByUid(id);
		String pas = MD5Utils.encodePassword(password, ui.getCredentialsSalt());
		return userInfoDao.updatePassword(pas, updateDate, uid);
	}
	@Override
	public UserInfo saveRoleId(UserInfo ui) {
		// TODO Auto-generated method stub
		return userInfoDao.save(ui);
	}


}