package com.springboot.demo.base.common;

/**
 * Created by ppm on 2017/3/17.
 */
public class DataTablesParam {
    private  int iDisplayStart;// 起始索引
    private  int iDisplayLength;// 每页显示的行数
    private int pageNum; //页码
    private String sEcho;

    public int getiDisplayLength() {
        return iDisplayLength;
    }

    public void setiDisplayLength(int iDisplayLength) {
        this.iDisplayLength = iDisplayLength;
    }

    public String getsEcho() {
        return sEcho;
    }

    public void setsEcho(String sEcho) {
        this.sEcho = sEcho;
    }

    public int getiDisplayStart() {
        return iDisplayStart;
    }

    public void setiDisplayStart(int iDisplayStart) {
        this.iDisplayStart = iDisplayStart;
    }

    public int getPageNum() {
        if(iDisplayStart==0){
            this.pageNum=0;
        }else{
            this.pageNum = iDisplayStart/iDisplayLength;
        }
        return pageNum;
    }

    public void setPageNum(int pageNum) {
    this.pageNum=pageNum;

    }
}
