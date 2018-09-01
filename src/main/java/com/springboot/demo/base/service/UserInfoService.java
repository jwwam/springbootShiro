package com.springboot.demo.base.service;

import java.util.Date;
import java.util.List;

import com.springboot.demo.base.entity.UserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserInfoService {
	
    /**通过username查找用户信息;*/
    UserInfo findByUsername(String username);
    
    UserInfo findByOne(Integer uid);
    
    /**更新用户信息*/
    void updateUserInfo(UserInfo ui);
    
    
	Page<UserInfo> findByUserName(String username, Pageable pageable);

	Page<UserInfo> findAll(Pageable pageable);
    List<UserInfo> findAll();
	
    UserInfo save(UserInfo ui);

    UserInfo saveUser(UserInfo ui);

    int updateState(int state, String uid);
	
    int updatePassword(String password, Date updateDate, String uid);
	
    UserInfo saveRoleId(UserInfo ui);


}