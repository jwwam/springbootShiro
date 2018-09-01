
$(function(){
	
	//初始化加载func
	initJsTree();
	//初始化验证框
	formValidator();
	
	function initJsTree(){
		
		  $("#jstree").jstree({
			    "core" : {
			    	"check_callback" : true,//在对树进行改变时，check_callback是必须设置为true；
			    	'data' :{
			    		 'url' : '../sysPermission/findAll',
			    		 dataType:'json'
			    	}
			    		
			    },
			    "plugins" : [ "dnd",
			                  "state",
			                  "contextmenu" 
			    ],
			    "contextmenu":{  
			        "items":{  
			            "create":null,  
			            "rename":null,  
			            "remove":null,  
			            "ccp":null,  
			            "新建资源":{  
			                "label":"新建资源菜单",  
			                "action":function(data){  
			                    //console.log(data);
			                    var inst = $.jstree.reference(data.reference);  
			                    var obj = inst.get_node(data.reference);
			                    addPermission(obj);
			                }  
			            },  
			            "修改资源":{  
			                "label":"修改资源菜单",  
			                "action":function(data){  
			                    //console.log(data);
			                    var inst = $.jstree.reference(data.reference);  
			                    var obj = inst.get_node(data.reference);
			                    updatePermission(obj);
			                }  
			            }, 
			            "删除资源":{  
			                "label":"删除资源菜单",  
			                "action":function(data){  
			                	var inst = $.jstree.reference(data.reference);  
			                    var obj = inst.get_node(data.reference);
			                	deletePermission(obj);
			                }  
			            } 
			         }  
			      }  
			}).bind("loaded.jstree", function (event, data) { 
	            $('#jstree').jstree().open_all();//opens all nodes in the container
            }).bind("activate_node.jstree", function (obj, e) {
                var currentNode = e.node;
                if( currentNode.id==0 ){
                	//alert("根节点");
                	return;
                }
                //updatePermission(currentNode);
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
		        closeDialog("closeButton","dialog");
			}
		});
    	
    	
    }
    
    /***
     *  触发添加资源点击事件
     * */
    function addPermission(obj){
    
    	$("#defaultForm").attr('action',"../sysPermission/sysPermissionAdd"); //通过jquery为action属性赋值
    	//重置验证框
	    $("#defaultForm").data('bootstrapValidator').destroy();
        $('#defaultForm').data('bootstrapValidator', null);
        formValidator();

        $('#modal-resouce').modal({
            keyboard: false,
            backdrop: true
        });
        $("#defaultForm").show();
        
        $("#id").val("");
        $("#name").val("");
        $("#resourceType").val("menu");
        $("#url").val("");
        $("#permission").val("");
        $("#available").val("0");
        
        $("#parentId").val(obj.id);
        $("#parentId2").val(obj.id);
       
    }
    
    
    /***
     *  触发修改资源点击事件
     * */
    function updatePermission(obj){
    	$.ajax({
			type: 'post',
			url: '../sysPermission/findByOne',
			dataType: "json",
			data : {
				id : obj.id
			},
			success: function (result) {
				var data=  result.data;
		    	$("#defaultForm").attr('action',"../sysPermission/updatePermission"); //通过jquery为action属性赋值
		    	//重置验证框
			    $("#defaultForm").data('bootstrapValidator').destroy();
		        $('#defaultForm').data('bootstrapValidator', null);
		        formValidator();
		    	
                $('#modal-resouce').modal({
                    keyboard: false,
                    backdrop: true
                });
                $("#defaultForm").show();
		        $("#id").val(data.id);
		        $("#name").val(data.name);
		        $("#resourceType").val(data.resourceType);
		        $("#url").val(data.url);
		        $("#permission").val(data.permission);
		        if(data.available){
		        	$("#available").val(1);
		        }else{
		        	$("#available").val(0);
		        }
		        
		        $("#parentId").val(data.id);
		        $("#parentId2").val(data.id);
			}
    	});
    }

    /***
     *  触发删除资源点击事件
     * */
    function deletePermission(obj){
        if(window.confirm('你确定删除吗？')){
            $.ajax({
                type: 'post',
                url: '../sysPermission/delete',
                dataType: "json",
                data : {
                    id : obj.id
                },
                success: function (result) {
                    newPrompt(result.msg);
                    $("#jstree").jstree(true).refresh();
                }
            });
        }else{
            return false;
        }
    }

    //关闭弹框
    $("#closeresouce").on('click', function () {
        $('#modal-resouce').modal('hide');
    });

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
	    	   name: {
	               message: 'The username is not valid',
	               validators: {
	                   notEmpty: {
	                       message: '资源名称不能为空！'
	                   }
	               }
	           },
	           url: {
	               message: 'The username is not valid',
	               validators: {
	                   notEmpty: {
	                       message: '资源路径不能为空！'
	                   }
	               }
	           }, 
	           permission: {
	               message: 'The username is not valid',
	               validators: {
	                   notEmpty: {
	                       message: '权限字符串不能为空！'
	                   }
	               }
	           }
	          
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
	    	   newPrompt(result.msg);
               $('#modal-resouce').modal('hide');
	    	   $("#jstree").jstree(true).refresh();  
	       }, 'json');
	   });
   
  }

   function newPrompt(msg){
	    $("#permissiondialog5").html(msg);
	    $("#permissiondialog5").dialog({
	        title: "提示框",
	        height: "auto",
	    });
	    setTimeout(function(){
	        $("#permissiondialog5").dialog( "close" );
	        $("#permissiondialog5").html("");
	    }, 4000);
	}
   
});
