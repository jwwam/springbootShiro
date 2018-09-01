
$(function(){
	
	//初始化加载func
	bindDataTables();
	//初始化验证框
	formValidator();

    $("#userInfoCloseButton").click(function(){
        $('#userInfodialog').dialog('close');
    });

	 //绑定搜索事件
	 $(".input-group .btn-search").click(function(){
		 bindDataTables();
	 }); //搜索
	 function bindDataTables(){
		 $("#datatable").dataTable({
				"bFilter": false,//不使用自带搜索框
				"bProcessing": true, // 是否显示取数据时的那个等待提示
				"bServerSide": true,//这个用来指明是通过服务端来取数据
				"bPaginate": true,
				"bSort": false,
				 bAutoWidth: false, //自动宽度
				 destroy:true,
				"sAjaxSource": "../userInfo/userList",
				"fnServerData": dataTableParam.retrieveData ,// 获取数据的处理函数
				"bPaginate": true,
				"sPaginationType": "full_numbers",
				"columns": [
			            { "data": "uid" },
						{ "data": "username" },
	                	{ "data": "name" },
	                	{ "data": "state" },
                    	{ "data": "uid" }
				],
				"createdRow": function (row, data, index) {
					/* 设置表格中的内容居中 */
					$('td', row).attr("class", "text-center");
				},
				"fnServerParams": function (aoData) {
					var username =  $(".input-group .input-title").val(); //你要传递的参数
					aoData.push({
						"name": "username",
						"value": username
					});
				},
				 "fnDrawCallback": function(){
					 var api = this.api();
					 var startIndex= api.context[0]._iDisplayStart;//获取到本页开始的条数
					 api.column(0).nodes().each(function(cell, i) {
						 cell.innerHTML = startIndex + i + 1;
					 });
				 },
				"aoColumnDefs": [
	                {
	                    "mRender": function (data, type,row ) {
	                        if(data==2){
	                            return "<span  id='"+data+"' style='color: red' >已禁用</span>";
	                        }else if(data==1){
	                            return "<span  id='"+data+"' style='' >启用</span>";
	                        }else if(data==0) {
                                return "<span  id='" + data + "' style='' >未认证</span>";
                            }else if(data==3){
	                            return "<span  id='"+data+"' style='color: #00c200;' >认证中</span>";
	                        }else{
                                return "<span  id='"+data+"' style='' >审核未通过</span>";
	                        }
	                    },
	                    sDefaultContent: '',
	                    aTargets: [3]       //列index
	                },
	                {
						"mRender": function (data, type,row ) {
							var html = "";
	                        if(row.state==2){
	                        	 html += "<a herf='#' id='"+row.uid+"' style='cursor: pointer;' class='updateState1'>启用</a>  | ";
	                        }else{
	                        	html +="<a herf='#' id='"+row.uid+"' style='cursor: pointer;' class='updateState2'>禁用</a>  | ";
	                                
	                        }
	                        html += "<a herf='#' id='"+row.uid+"' style='cursor: pointer;' class='updateUser'>修改</a>  |  "  + 
	                        "<a herf='#' id='"+row.uid+"' style='cursor: pointer;' class='updatePassword'>修改密码</a> | "+
                            "<a herf='#' id='"+row.uid+"' name='"+row.name+"' style='cursor: pointer;' class='grantRole'>分配角色</a>";
	                        
	                        return html;

						},
						sDefaultContent: '',
						aTargets: [4]       //列index
	            	}
	            ],
				columnDefs: [
					{ "bSortable": false, "aTargets": [ 0 ] }],
				"language": dataTableParam.lang

			});
	 }
	 
    //绑定点击事件
    $('#datatable').on( 'click', 'a', function () {
    	
    	//重置验证框
	    $("#userInfoDefaultForm").data('bootstrapValidator').destroy();
        $('#userInfoDefaultForm').data('bootstrapValidator', null);
        formValidator();
        
        //console.log(this);
        var id = $(this).attr('id');
        var claz = $(this).attr("class");
        var name = $(this).attr("name");
        if( claz =="updateState1" ){
        	updateState(1,id);
        }else if(claz =="updateState2"){
        	updateState(2,id);
        }else if(claz=="updatePassword"){
        	updatePassword(id);
        }else if( claz =="grantRole" ){
        	grantRole(id,name);
        }else{
        	updateUser(id);
        }

    });

    function updateState(state,uid){
    	//console.log("打开编辑框");
    	$.ajax({
			type: 'post',
			url: '../userInfo/updateState',
			dataType: "json",
			data : {
				state : state,
				uid : uid
				
			},
			success: function (result) {
		    	 newPrompt(result.msg);
		    	 bindDataTables();
			}
		});
    }
    
    
    //修改密码
    function updatePassword(uid){
    	
    	$.ajax({
			type: 'post',
			url: '../userInfo/findByOne',
			dataType: "json",
			data : {
				uid : uid
			},
			success: function (result) {
				var res = result.data;
				$("#uid").val(res.uid);
				$("#username").val(res.username);
				$("#remarks").val(res.remarks);
				$("#userInfoDefaultForm .password").show();
				$("#userInfoDefaultForm .confirmPassword").show();
				$("#userInfoDefaultForm .username").show();
				
				$("#userInfoDefaultForm .sum").hide();
			    $("#userInfoDefaultForm .price").hide();
		        $("#userInfoDefaultForm .state").hide();
		        $("#userInfoDefaultForm .name").hide();
		        $("#userInfoDefaultForm .smsNumber").hide();
                $("#userInfoDefaultForm .sendBackAddress").hide();
                $("#userInfoDefaultForm .addTempBackAddress").hide();
                $("#userInfoDefaultForm .license").hide();
                $("#userInfoDefaultForm .histroySum").hide();
                $("#userInfoDefaultForm .signName").hide();

		        
		        $("#userInfoDefaultForm").attr('action',"../userInfo/updatePassword"); //通过jquery为action属性赋值
		        $("#userInfodialog").dialog({
		            title: "修改密码",
		            height: "auto",
		            minWidth:"600",
		            minHeight:"320"
		        });
			}
		});
    }
    
    //修改用户信息
    function updateUser(uid){
    	$.ajax({
			type: 'post',
			url: '../userInfo/findByOne',
			dataType: "json",
			data : {
				uid : uid
			},
			success: function (result) {
				var res = result.data;
				$("#uid").val(res.uid);
				
				$("#username").val(res.username);
				$('#username').attr("readonly",true);
		        $("#userInfoDefaultForm .username").show();
		        
		        $("#name").val(res.name);
		        $("#userInfoDefaultForm .name").show();
		        
		        $("#remarks").val(res.remarks);
		        
		        $("#userInfoDefaultForm .smsNumber").show();
		        $("#smsNumber").val(res.smsNumber);
		        
		        $("#userInfoDefaultForm .sendBackAddress").show();
                $("#sendBackAddress").val(res.sendBackAddress);
                
                $("#userInfoDefaultForm .addTempBackAddress").show();
                $("#addTempBackAddress").val(res.addTempBackAddress);
                
                $("#userInfoDefaultForm .license").show();
                $("#license").val(res.license);
                
                $("#userInfoDefaultForm .price").show();
                $("#price").val(res.price);
                $('#price').attr("readonly",false);
                
                $("#userInfoDefaultForm .histroySum").show();
                $("#histroySum").val(res.histroySum);

                $("#userInfoDefaultForm .signName").show();
                $("#signName").val(res.signName);
                
		        
		        $("#userInfoDefaultForm .password").hide();
		        $("#userInfoDefaultForm .confirmPassword").hide();
		        $("#userInfoDefaultForm .state").hide();
		        $("#userInfoDefaultForm .sum").hide();
		        
		        
		        $("#userInfoDefaultForm").attr('action',"../userInfo/updateUser"); //通过jquery为action属性赋值
		        $("#userInfodialog").dialog({
		            title: "修改客户",
		            height: "auto",
		            minWidth:"600",
		            minHeight:"320"
		        });
			}
		});
    	
    	
    }
    
    /***
     *  触发添加客户点击事件
     * */
    $("#addUserInfo").click(function(){
    	
    	//重置验证框
	    $("#userInfoDefaultForm").data('bootstrapValidator').destroy();
        $('#userInfoDefaultForm').data('bootstrapValidator', null);
        formValidator();
    	
        $("#username").val("");
        $("#name").val("");
        $("#password").val("");
        $("#confirmPassword").val("");
        $("#sum").val(0);
        $("#price").val(0);
        $('#price').attr("readonly",false);
        $("#smsNumber").val(0);
        var time = new Date().getTime()+"";
        $("#license").val(time.MD5());

        
        $('#username').attr("readonly",false);
        $("#userInfoDefaultForm .username").show();
        $("#userInfoDefaultForm .name").show();
        $("#userInfoDefaultForm .password").show();
        $("#userInfoDefaultForm .confirmPassword").show();
        $("#userInfoDefaultForm .price").show();
        //$("#userInfoDefaultForm .sum").show();
        $("#userInfoDefaultForm .state").show();
        $("#userInfoDefaultForm .sendBackAddress").show();
        $("#userInfoDefaultForm .addTempBackAddress").show();
        $("#userInfoDefaultForm .license").show();
        $("#userInfoDefaultForm .signName").show();

        $("#userInfoDefaultForm .smsNumber").hide();
        $("#userInfoDefaultForm .sum").hide();
        $("#userInfoDefaultForm .histroySum").hide();
        
        $("#userInfodialog").dialog({
            title: "添加客户",
            height: "auto",
            minWidth:"1100",
            minHeight:"350"
        });
    });
    
    
    /**
     * 給用户分配角色
     * **/
    function grantRole(id,name){
       var html  = "";
       $("#userInfoId").val(id);
 	   $.ajax({
 			type: 'post',
 			url: '../roleInfo/findAll',
 		    async:false, 
 			dataType: "json",
 			data : {},
 			success: function (result) {
 				var res = result.data;
 				html = '<select id="authorifyselect" multiple="multiple">'
 				
 				 $.ajax({
 		 			type: 'post',
 		 			url: '../userInfo/findByRoleId',
 		 		    async:false, 
 		 			dataType: "json",
 		 			data : {
 		 				uid : id
 		 			},
 		 			success: function (data) {
 		 				var d = data.data;
 		 				for (var i= 0; i < res.length; i++) {
 		 					var isSelect = false;
 		 					for (var j= 0; j < d.length; j++) {
 		 						if(res[i].id == d[j].id){
 		 							isSelect = true;
 		 						}
 	 		 				}
 		 					if(isSelect){
 		 						html+='<option name="'+res[i].id+'" value="'+res[i].id+'" data-section="角色列表" data-description="'+res[i].description+'" selected >'+res[i].role+'</option>';
 		 					}else{
 		 						html+='<option name="'+res[i].id+'" value="'+res[i].id+'" data-section="角色列表" data-description="'+res[i].description+'">'+res[i].role+'</option>';
 		 					}
 						}
 		 				
 		 				html += "</select>";
 		 				$("#authorityBody").empty().append(html);
 		 				$("#AuthorityTitle").text('给 (' + name + ')分配角色');
 		 				$("#authorifyselect").treeMultiselect({ 
 		 					searchable: false,
 		 					allowBatchSelection : true
 		 				});
 		 				$("#grantAuthorityModal").modal('show');
 		 			}
 		 		 });
 			}
 	   });
    }
    
    /**
     * 提交
     * */
    $("#authoritysubmit").click(function(){
    	var uid = $("#userInfoId").val();
    	var selectedId = $("#authorifyselect").val();
    	var str = "";
    	for (var int = 0; int < selectedId.length; int++) {
    		if(int == selectedId.length-1 ){
    			str += selectedId[int]
    		}else{
    			str += selectedId[int]+"-"
    		}
		}
    	 $.ajax({
  			type: 'post',
  			url: '../userInfo/saveRoleId',
  		    async:false, 
  			dataType: "json",
  			data : {
  				str : str,
  				uid : uid
  			},
  			success: function (result) {
  				if(result.status){
  				   $("#grantAuthorityModal").modal('hide');
 	    		   bindDataTables();
 	    	   }
 	    	   newPrompt(result.msg);
  			}
  		});
    });
    
    /***
     *  添加客户，加入验证表单
     * */
  function formValidator(){
	  var againSubmit = false;
	   $('#userInfoDefaultForm').bootstrapValidator({
	       message: 'This value is not valid',
	       feedbackIcons: {
	           valid: 'glyphicon glyphicon-ok',
	           invalid: 'glyphicon glyphicon-remove',
	           validating: 'glyphicon glyphicon-refresh'
	       },
	       fields: {
	           username: {
	               message: 'The username is not valid',
	               validators: {
	                   notEmpty: {
	                       message: '客户账号不能为空！'
	                   },
	                   stringLength: {
	                       min: 5,
	                       max: 10,
	                       message: '客户账号必须5到10位！'
	                   }
	               }
	           }, 
	           password: {
	               validators: {
	                   notEmpty: {
	                       message: '密码不能为空！'
	                   },
	                   identical: {
	                       field: 'confirmPassword',
	                       message: '密码 不一致！'
	                   }
	               }
	           },
	           confirmPassword: {
	               validators: {
	                   notEmpty: {
	                       message: '密码不能为空！'
	                   },
	                   identical: {
	                       field: 'password',
	                       message: '密码 不一致！'
	                   }
	               }
	           },
	           name: {
	               validators: {
	                   notEmpty: {
	                       message: '客户名称不能为空！'
	                   }
	               
	               }
	           },
	       }
	   })
	   .on('success.form.bv', function(e) {
	       // Prevent form submission
	       e.preventDefault();
	       if(againSubmit){
                 return ;
            }
           againSubmit = true;
	       // Get the form instance
	       var $form = $(e.target);
	       // Get the BootstrapValidator instance
	       var bv = $form.data('bootstrapValidator');
	       // Use Ajax to submit form data
	       $.post($form.attr('action'), $form.serialize(), function(result) {
	    	   if(result.status){
	    		   $('#userInfodialog').dialog('close');
	    		   bindDataTables();
	    	   }else{
                   againSubmit = false;
	    	   }
	    	   newPrompt(result.msg);
	       }, 'json');
	   });
   
  }

   function newPrompt(msg){
	    $("#userInfodialog5").html(msg);
	    $("#userInfodialog5").dialog({
	        title: "提示框",
	        height: "auto",
	    });
	    setTimeout(function(){
	        $("#userInfodialog5").dialog( "close" );
	        $("#userInfodialog5").html("");
	    }, 4000);
	}

});
