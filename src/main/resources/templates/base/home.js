
 $(function(){
     goUrl("../home/welcome");
 });

function goUrl(url) {
    $("#content").html('<div id="page-wrapper" style="height:600px;"><img src="../images/home/loading2.gif"  /></div>');
    ajax(url);
}

function ajax(url){
    $.ajax({
        type: 'post',
        url: url,
        dataType: "html",
        data : { },
        success: function (result) {
            $("#content").html(result);
           /* if(result >= 0){
                 window.location.href="../base/error";
            }else{
                $("#content").html(result);
            }*/
        }
    });
}

