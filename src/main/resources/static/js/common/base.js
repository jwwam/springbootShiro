
/**
 * dialog
 * */
define(["jquery"],function(jquery) {  
	
	 return{
		 ajax : function(url,type,dataType,data,result){
			 $.ajax({
				    url: url,  //ajax请求地址
				    //cache: false,//(默认: true,dataType为script和jsonp时默认为false)设置为 false 将不缓存此页面，建议使用默认
				    type:type,//请求方式 "POST" 或 "GET"， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
				    dataType:dataType,    //根据返回数据类型可以有这些类型可选：xml html script json jsonp text
				    //发送到服务器的数据，可以直接传对象{a:0,b:1}，如果是get请求会自动拼接到url后面，如：&a=0&b=1
				    //如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 "&foo=bar1&foo=bar2"。
				    data:data,
				    //发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。XMLHttpRequest 对象是唯一的参数。这是一个 Ajax 事件。如果返回false可以取消本次ajax请求。
				    beforeSend:function(xhr){
				        //this 默认为调用本次AJAX请求时传递的options参数
				    },
				    //context这个对象用于设置ajax相关回调函数的上下文。也就是说，让回调函数内this指向这个对象（如果不设定这个参数，那么this就指向调用本次AJAX请求时传递的options参数）。
				    //比如指定一个DOM元素作为context参数，这样就设置了success回调函数的上下文为这个DOM元素。
				    context: document.body,
				    //请求成功后的回调函数
				    success: function(data,textStatus){
				        //this 调用本次AJAX请求时传递的options参数 ,如果设置context来改变了this，那这里的this就是改变过的
				    	result(data,textStatus);
				    },
				    //请求失败时调用此函数。有以下三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。
				    //如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能是"timeout", "error", "notmodified" 和 "parsererror"。
				    error : function(XMLHttpRequest, textStatus, errorThrown){
				    	 alert("textStatus:"+textStatus+",errorThrown:"+errorThrown);
				        // 通常 textStatus 和 errorThrown 之中
				        // 只有一个会包含信息
				        // this 调用本次AJAX请求时传递的options参数
				    },
				    //请求完成后回调函数 (请求成功或失败之后均调用)。参数： XMLHttpRequest 对象和一个描述成功请求类型的字符串
				    complete:function(XMLHttpRequest, textStatus) {
				        //this 调用本次AJAX请求时传递的options参数
				    },
				    //一组数值的HTTP代码和函数对象，当响应时调用了相应的代码。例如，如果响应状态是404，将触发以下警报：
				    statusCode:{
				        404:function(){
				            alert('404，页面不存在');
				        }
				    }
				});
		 }
	 }
 
});  