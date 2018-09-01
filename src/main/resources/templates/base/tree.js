$(document).ready(function(){
	loadTree();//初始化
	function loadTree(){
		var html = '<div class="clearfix"></div>'+
		'<li  id="home">'+
		'<a href="#" onclick="goUrl(\'../home/welcome\')">'+
		'	<i class="fa fa-tachometer fa-fw">'+
		'		<div class="icon-bg bg-orange"></div>'+
		'	</i>'+
		'	<span class="menu-title">欢迎主页</span>'+
		'</a>'+
		'</li>';
		$.ajax({
		type: 'post',
		url: '../home/getTree',
		dataType: "json",
		data : {},
		success: function (result) {
			var array = result.data;
			for (var i = 0; i < array.length; i++) {
				html+= '<li  id="'+array[i].id+'" >'+
						'<a href="#" onclick="goUrl(\'../'+array[i].url+'\')">'+
						'	<i class="fa fa-th-list fa-fw">'+
						'		<div class="icon-bg bg-blue"></div>'+
						'	</i>'+
						'	<span class="menu-title">'+array[i].name+'</span>'+
						'</a>'+
					'</li>';
			}   
			$("#side-menu").append(html);
		    $("#home").addClass("selected");//添加默认的选择class

            sessionStorage.setItem("isReload",true)

            $("#side-menu li").click(function(e){
                 $("#side-menu").find('li').each(function() {
                    $(this).removeClass("selected");
                 });
                $(this).addClass("selected");
            });
         }
		});

	}
	
});
