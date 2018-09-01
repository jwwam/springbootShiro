
$(function(){
	
	//初始化加载func
	bindDataTables();
	//初始化验证框
	formValidator();
	
	
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
				"sAjaxSource": "../roleInfo/roleList",
				"fnServerData": dataTableParam.retrieveData ,// 获取数据的处理函数
				"bPaginate": true,
				"sPaginationType": "full_numbers",
				"columns": [
			            { "data": "id" },
						{ "data": "role" },
						{ "data": "description" }
				],
				"createdRow": function (row, data, index) {
					/* 设置表格中的内容居中 */
					$('td', row).attr("class", "text-center");
				},
				"fnServerParams": function (aoData) {
					var role =  $(".input-group .input-title").val(); //你要传递的参数
					aoData.push({
						"name": "role",
						"value": role
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
							var html = "";
	                        html += "<a herf='#' id='"+row.id+"' style='cursor: pointer;' class='updateState1'>删除</a>  | ";
	                        html += "<a herf='#' id='"+row.id+"' style='cursor: pointer;' class='updateRole'>修改</a> | "+
	                        "<a herf='#' id='"+row.id+"' name='"+row.role+"' style='cursor: pointer;' class='grantPermission'>分配资源</a>";;
	                        
	                        return html;

						},
						sDefaultContent: '',
						aTargets: [3]       //列index
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
	    $("#defaultForm").data('bootstrapValidator').destroy();
        $('#defaultForm').data('bootstrapValidator', null);
        formValidator();
        
        //console.log(this);
        var id = $(this).attr('id');
        var claz = $(this).attr("class");
        var name = $(this).attr("name");
        
        if( claz =="updateState1" ){
        	updateState(false,id);
        }else if(claz=="grantPermission"){
        	grantPermission(id,name);
        }else{
        	updateRole(id);
        }

    });

    function updateState(available,id){
    	//console.log("打开编辑框");
    	$.ajax({
			type: 'post',
			url: '../roleInfo/updateState',
			dataType: "json",
			data : {
				available : available,
				id : id
				
			},
			success: function (result) {
		    	 newPrompt(result.msg);
		    	 bindDataTables();
			}
		});
    }
    
  
    //修改角色信息
    function updateRole(id){
    	
    	$.ajax({
			type: 'post',
			url: '../roleInfo/findByOne',
			dataType: "json",
			data : {
				id : id
			},
			success: function (result) {
				 var res = result.data;
				 $("#role").val(res.role);
				 $("#id").val(res.id);
			     $("#description").val(res.description);
			     
		         $("#defaultForm .available").hide();
		        
		        
		        $("#defaultForm").attr('action',"../roleInfo/updateRole"); //通过jquery为action属性赋值
		        $("#dialog").dialog({
		            title: "修改角色",
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
    $("#addRoleInfo").click(function(){
    	
    	$("#defaultForm").attr('action',"../roleInfo/sysRoleAdd"); //通过jquery为action属性赋值
    	//重置验证框
	    $("#defaultForm").data('bootstrapValidator').destroy();
        $('#defaultForm').data('bootstrapValidator', null);
        formValidator();
    	
        $("#role").val("");
        $("#description").val("");
        $("#defaultForm .available").show();

        $("#dialog").dialog({
            title: "添加角色",
            height: "auto",
            minWidth:"600",
            minHeight:"420"
        });
        closeDialog("closeButton","dialog");
        
    });
    
    
    /**
     * 給角色分配资源
     * **/
   
    
    function grantPermission(id,name){
    	
    	$("#roleId").val(id);//设置角色id
    	/**例子*/
    	/*$('#jstree1').jstree({
    		'core' : {
    			'data' : [
    				{"id":"1","parent":"#","text" : "Root node","state" : { "opened" : true }},
    				{"id":"2","parent":"1","text" : "Root node","state" : { "opened" : true  }},
    				{"id":"3","parent":"1","text" : "Root node","state" : { "opened" : true }},
    				{"id":"4","parent":"2","text" : "Root node","state" : { "opened" : true ,"selected":"true"}},
    				{"id":"5","parent":"3","text" : "Root node","state" : { "opened" : true }}
    			]
    		},
    		"plugins": [ "checkbox"]
    	});*/
    	
    	//$('#jstree').jstree(true).select_node('4');
    	 /***
		 * 循环设置拥有的资源，进行选中
		 * */
		$.ajax({
			type: 'post',
			url: '../sysPermission/findAll',
			dataType: "json",
			data : {},
			success: function (res) {
				$.ajax({
					type: 'post',
					url: '../roleInfo/findBypermission',
					dataType: "json",
					data : {
						id : id
					},
					success: function (data) {
						var selectData = data.data;
						var jsonstr="[]";
                        var jsonarray = eval('('+jsonstr+')');
                        
						for (var i = 0; i < res.length; i++) {
							var isSelect  = false;
							for (var j = 0; j < selectData.length; j++) {
								if(res[i].id == selectData[j].id ){
									isSelect = true;
									break;
								}
							}
							if(isSelect){
								var arr ={ "id" :res[i].id  , "parent" : res[i].parent,  "state": {"opened" : true,"selected":true}, "text" : res[i].text };
								jsonarray.push(arr);
							}else{
								var arr ={ "id" :res[i].id  , "parent" : res[i].parent,  "state": {"opened" : true,"selected":false}, "text" : res[i].text };
								jsonarray.push(arr);
							}
						}
						console.log(jsonarray);
						$('#jstree').data('jstree', false).empty();
						$('#jstree').jstree({
				    		'core' : {
				    			'data' : jsonarray
				    		},
				    		"plugins": [ "checkbox"],
				    		"checkbox": {
			                    "three_state": false//父子级不关联选中
			                }
				    	});
					}
				});
			 }	
		});
		
    
    	
    	//$('#jstree').jstree(true).get_selected(true)[0]
    	$("#dialog2").dialog({
            title: "分配("+name+")资源权限",
            height: "auto",
            minWidth:"500",
            minHeight:"420"
        });
    }
    
    

    /**
     * 提交
     * */
    $("#submitTreeButton").click(function(){
    	var id = $("#roleId").val();
    	var selectedId = $('#jstree').jstree(true).get_selected(true);
    	var str = "";
    	for (var int = 0; int < selectedId.length; int++) {
    		if(int == selectedId.length-1 ){
    			str += selectedId[int].id;
    		}else{
    			str += selectedId[int].id+"-";
    		}
		}
    	console.log(str);
    	 $.ajax({
  			type: 'post',
  			url: '../roleInfo/savePermissionId',
  		    async:false, 
  			dataType: "json",
  			data : {
  				str : str,
  				id : id
  			},
  			success: function (result) {
  				newPrompt(result.msg);
  				 $('#dialog2').dialog('close');
  			}
  		});
    	
    });
    
    
    closeDialog("closeButton","dialog");
    closeDialog("closeTreeButton","dialog2");
    //关闭弹窗口
    function closeDialog(buttonId,dialogId){
    	
    	$("#"+buttonId).click(function(){
       	 $('#'+dialogId).dialog('close');
       });
    }
   

    
    /***
     *  添加角色，加入验证表单
     * */
  function formValidator(){
	  
	   $('#defaultForm').bootstrapValidator({
	       message: 'This value is not valid',
	       feedbackIcons: {
	           valid: 'glyphicon glyphicon-ok',
	           invalid: 'glyphicon glyphicon-remove',
	           validating: 'glyphicon glyphicon-refresh'
	       },
	       fields: {
	    	   role: {
	               message: 'The username is not valid',
	               validators: {
	                   notEmpty: {
	                       message: '角色名称不能为空！'
	                   }
	               }
	           },
	           description: {
	               message: 'The username is not valid',
	               validators: {
	                   notEmpty: {
	                       message: '角色描述不能为空！'
	                   }
	               }
	           }, 
	          
	       }
	   })
	   .on('success.form.bv', function(e) {
	       // Prevent form submission
	       e.preventDefault();
	
	       // Get the form instance
	       var $form = $(e.target);
	
	       // Get the BootstrapValidator instance
	       var bv = $form.data('bootstrapValidator');
	
	       // Use Ajax to submit form data
	       $.post($form.attr('action'), $form.serialize(), function(result) {
	    	   if(result.status){
	    		   $('#dialog').dialog('close');
	    		   bindDataTables();
	    	   }
	    	   newPrompt(result.msg);
	       }, 'json');
	   });
   
  };
   function newPrompt(msg){
	    $("#dialog5").html(msg);
	    $("#dialog5").dialog({
	        title: "提示框",
	        height: "auto",
	    });
	    setTimeout(function(){
	        $("#dialog5").dialog( "close" );
	        $("#dialog5").html("");
	    }, 4000);
	}
   
});
