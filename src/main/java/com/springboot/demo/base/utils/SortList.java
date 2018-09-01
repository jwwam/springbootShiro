package com.springboot.demo.base.utils;

//SortList.java
import java.util.Collections;

import java.util.Comparator;

import java.util.List;

import java.lang.reflect.Method;

import java.lang.reflect.InvocationTargetException;



public class SortList<E>{

  

  public void Sort(List<E> list, final String method){

     //排序

     Collections.sort(list, new Comparator() {        

         public int compare(Object a, Object b) {

         int ret = 0;

         try{

             Method m1 = ((E)a).getClass().getMethod(method, null);

             Method m2 = ((E)b).getClass().getMethod(method, null);

             ret = m1.invoke(((E)a), null).toString().compareTo(m2.invoke(((E)b), null).toString());                  

         }catch(NoSuchMethodException ne){

             System.out.println(ne);

            }catch(IllegalAccessException ie){

                System.out.println(ie);

            }catch(InvocationTargetException it){

                System.out.println(it);

            }

         return ret;

         }

      });

  }

}