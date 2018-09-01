package com.springboot.demo.base.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

/**
 * Created by ppm on 2016/10/23.
 */
public class BuildPageRequest {
  public   static PageRequest getPageRequest(int pageNum,int pageSize,Sort.Direction direction,String sortType){
        PageRequest requestPage=new PageRequest(pageNum, pageSize, direction,sortType);
        return  requestPage;
    }
}
