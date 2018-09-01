
$(function() {

    //修改账号密码
    formValidator();//初始化验证框
    $("#updateMyPassword").click(function () {
        $("#dialogPassword").dialog({
            title: "修改密码",
            height: "auto",
            minWidth: "600",
            minHeight: "320"
        });
    });
    $("#closePasswordButton").click(function () {
        $('#dialogPassword').dialog('close');
    });

    /***
     *  添加客户，加入验证表单
     * */
    function formValidator() {

        $('#defaultPasswordForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
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
                }

            }
        })
            .on('success.form.bv', function (e) {
                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');

                // Use Ajax to submit form data
                $.post($form.attr('action'), $form.serialize(), function (result) {
                    if (result.status) {
                        $('#dialogPassword').dialog('close');
                    }
                }, 'json');
            });

    }

    //BEGIN JQUERY NEWS UPDATE
    $('#news-update').ticker({
        controls: false,
        titleText: ''
    });
    //END JQUERY NEWS UPDATE

});