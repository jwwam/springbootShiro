
var dialog = {
		
		 //html dialog
		 /**
		  *  param  bj.title,obj.height,obj.width,obj.submit(),obj.id
		  * */
		 newDialog : function(obj){
			 $("#"+obj.id).dialog({
				  title: obj.title,
			      height: obj.height,
			      width: obj.width,
			      minWidth:"450",
			      minHeight:"300",
			      modal: true,
			      buttons: {
			        "确定": function() {
			        	obj.submit();
			        	$( this ).dialog( "close" );
			        },
			        "关闭": function() {
			        	$( this ).dialog( "close" );
			        }
			      }
			});
		 },
		 //html dialog
		 /**
		  *  param  bj.title,obj.height,obj.width,obj.submit(),obj.id
		  * */
		 newValidateDialog : function(obj){
			 $("#"+obj.id).dialog({
				  title: obj.title,
			      height: obj.height,
			      width: obj.width,
			      minWidth:"450",
			      minHeight:"300",
			      modal: true,
			      buttons: {
			        "确定": function() {
			        	obj.submit();
			        },
			        "关闭": function() {
			        	$( this ).dialog( "close" );
			        }
			      }
			});
		 },
		//html dialog
		 /**
		  *  param  msg
		  * */
		 newPrompt : function(msg){
			 $("#myPrompt").append(msg);
			 $("#myPrompt").dialog({
				  title: "提示框",
			      height: "auto",
			      minWidth:"250",
			      minHeight:"150"
			});
			 setTimeout(function(){
				 $("#myPrompt").dialog( "close" );
				 $("#myPrompt").html("");
            }, 3000);
			 
		 },
		//html dialog
		 /**
		  *  param  msg
		  * */
		 newCountDown : function(msg,func){
			 $("#myPrompt").append("正在加载数据...");
			 $("#myPrompt").dialog({
				  title: "倒计时",
			      height: "auto",
			      minWidth:"250",
			      minHeight:"150"
			});
			 setTimeout(function(){
				 $("#myPrompt").dialog( "close" );
				 $("#myPrompt").html("");
				 func();
            },5000);
			 
		 }
		
}
		
		 
		
 
