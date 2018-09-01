package com.springboot.demo.base.dao;


import com.springboot.demo.base.entity.UserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Transactional
public interface UserInfoDao extends CrudRepository<UserInfo,Long> {
    /**通过username查找用户信息;*/

	@Query("from UserInfo u where u.username = ?1 and state !=2")
    public UserInfo findByUsername(String username);

    public UserInfo findByUid(Integer uid);
    
    
	@Query("from UserInfo u where u.username = ?1")
	Page<UserInfo> findByUserName(String username, Pageable pageable);

	//@Query("select uid,username,name,password,state from UserInfo")
	Page<UserInfo> findAll(Pageable pageable);
	List<UserInfo> findAll();
	
	@Modifying(clearAutomatically = true)
	@Query(value = "update user_info ui set ui.state=?1,ui.update_date=?2 where ui.uid = ?3",nativeQuery = true)
	public int updateState(int state, Date updateDate, String uid);

	/*@Modifying(clearAutomatically = true)
	@Query(value = "update user_info ui set ui.sum=?1,ui.remarks=?2,ui.update_date=?3,ui.sms_number=?4,ui.histroy_sum=?5  where ui.uid = ?6",nativeQuery = true)
	public int chargeMoney (double sum,String remarks,Date updateDate,int smsNumber,double histroySum,String uid);*/

	@Modifying(clearAutomatically = true)
	@Query(value = "update user_info ui set ui.password=?1,ui.update_date=?2 where ui.uid = ?3",nativeQuery = true)
	public int updatePassword(String password, Date updateDate, String uid);


	@Modifying(clearAutomatically = true)
	@Query(value = "update user_info ui set ui.sms_number=?1,ui.update_date=?2 where ui.uid = ?3",nativeQuery = true)
	public int updateSmsNumber(int smsNumber, Date updateDate, String uid);

}