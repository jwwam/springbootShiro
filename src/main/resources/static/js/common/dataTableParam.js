
var dataTableParam = {  
	//中文化datatables
	lang : {
	    "sProcessing": "处理中...",
	    "sLengthMenu": "每页 _MENU_ 条",
	    "sZeroRecords": "没有匹配结果",
	    "sInfo": "当前显示第 _START_ 至 _END_ 条，共 _MAX_ 条。",
	    "sInfoEmpty": "当前显示第 0 至 0 条，共 _MAX_  条",
	    "sInfoFiltered": "(有 _MAX_ 条结果过滤)",
	    "sInfoPostFix": "",
	    "sSearch": "搜索:",
	    "sUrl": "",
	    "sEmptyTable": "表中数据为空",
	    "sLoadingRecords": "载入中...",
	    "sInfoThousands": ",",
	    "oPaginate": {
	        "sFirst": "首页",
	        "sPrevious": "上页",
	        "sNext": "下页",
	        "sLast": "末页",
	        "sJump": "跳转"
	    },
	    "oAria": {
	        "sSortAscending": ": 以升序排列此列",
	        "sSortDescending": ": 以降序排列此列"
	    }
	 },
	//自动绑定form表单的函数
	loadData : function (jsonStr) {

	    var obj = eval("(" + jsonStr + ")");
	    var key, value, tagName, type, arr;
	    for (x in obj) {
	        key = x;
	        value = obj[x];

	        $("[name='" + key + "'],[name='" + key + "[]']").each(function () {
	            tagName = $(this)[0].tagName;
	            type = $(this).attr('type');
	            if (tagName == 'INPUT') {
	                if (type == 'radio') {
	                    $(this).attr('checked', $(this).val() == value);
	                } else if (type == 'CHECKBOX') {
	                    arr = value.split(',');
	                    for (var i = 0; i < arr.length; i++) {
	                        if ($(this).val() == arr[i]) {
	                            $(this).attr('checked', true);
	                            break;
	                        }
	                    }
	                } else {
	                    $(this).val(value);
	                }
	            } else if (tagName == 'SELECT' || tagName == 'TEXTAREA') {
	                //console.info(tagName);
	                //console.info(value+";"+typeof(value));
	                $(this).val(value+"");
	            }

	        });
	    }
	},
	//分页查询
	retrieveData : function( sSource111,aoData111, fnCallback111) {
	    $.ajax({
	        url : sSource111,//这个就是请求地址对应sAjaxSource
	        data :aoData111,//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
	        type : 'post',
	        dataType : 'json',
	        async : false,
	        success : function(result) {
	            fnCallback111(result);//把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
	        },
	        error : function(msg) {
	        }
	    });
	}
	
 
};  