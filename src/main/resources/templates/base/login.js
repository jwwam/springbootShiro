

var  isReload= sessionStorage.getItem("isReload")
if( isReload != null ){
    location.reload();
    sessionStorage.clear();//清楚所有的session
}

$(document).ready(function(){

    /*
  Fullscreen background
*/
    $.backstretch("assets/img/backgrounds/1.jpg");

    /*
	    Modals
	*/
    $('.launch-modal').on('click', function(e){
        e.preventDefault();
        $( '#' + $(this).data('modal-id') ).modal();
    });

    /*
        Form validation
    */
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });

    $('.registration-form').on('submit', function(e) {

        $(this).find('input[type="text"], textarea').each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });

    });

    $("#regestform").submit(function(e){
        e.preventDefault();
        var username = $("#zh").val();
        var password = $("#mm").val();
        var companyname = $("#gsmc").val();
        var phone = $("#phone").val();
        var lxr = $("#lxr").val();
        $.ajax({
            type: 'post',
            url: "../userInfo/regest",
            dataType: "json",
            async: false,
            data : {
                username : username,
                password : password,
                companyname : companyname,
                phone : phone,
                lxr : lxr
            },
            success: function (result) {
                if(result.status=="0"){
                    alert(result.msg);
                    return false;
                }
                location.href="../login/home";
            },
            error: function () {
                console.log("error!");
            }
        });

    });

});

function changeValidateCode() {
    var timestamp  =  "?data=" + new Date() + Math.floor( Math.random()*24 );
    $("#randImg").attr('src','../login/getGifCode');
}
function newPrompt(msg){
    $("#dialog").html(msg);
    $("#dialog").dialog({
        title: "提示框",
        height: "auto",
        minWidth:"240",
        minHeight:"220"
    });
    /*setTimeout(function(){
        $("#dialog").dialog( "close" );
        $("#dialog").html("");
    }, 8000);*/
}
