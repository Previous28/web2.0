(function () {
    $(function () { new signUp(); });

    function signUp () {
        this.focusListener();
        this.blurListener();
        this.listenResetButton();
        this.listenSubmitButton();
    }

    var s = signUp.prototype;
    s.checkUserName = s.checkStudentId = s.checkPhone = s.checkEmail = false;
    //每个填入框聚焦的时候显示出相应的提示
    s.focusListener = function () {
        $('#username').focus(function () {
            $('.tips').eq(0).removeClass('warning pass').css('opacity', 1).text("Tip:6~18位英文字母、数字或下划线，必须以英文字母开头");
        });
        $('#password1').focus(function () {
            $('.tips').eq(1).removeClass('warning pass').css('opacity', 1).text("Tip:6~12位数字、大小写字母、中划线、下划线");
        });
        $('#password2').focus(function () {
            $('.tips').eq(2).removeClass('warning pass').css('opacity', 1).text("Tip:再次输入密码");
        });
        $('#studentId').focus(function () {
            $('.tips').eq(3).removeClass('warning pass').css('opacity', 1).text("Tip:8位数字，不能以0开头");
        });
        $('#phoneNum').focus(function () {
            $('.tips').eq(4).removeClass('warning pass').css('opacity', 1).text("Tip:11位数字，不能以0开头");
        });
        $('#email').focus(function () {
            $('.tips').eq(5).removeClass('warning pass').css('opacity', 1).text("Tip:请填写常用邮箱");
        });
    };
    //每个输入框失焦的时候，检查用户所输入的是否合法，对结果给出相应的提示
    s.blurListener = function () {
        this.usernameBlur();
        this.password1Blur();
        this.password2Blur();
        this.studentIdBlur();
        this.phoneNumBlur();
        this.emailBlur();
    };

    s.usernameBlur = function () {
        $('#username').blur(function () {
            if ($('#username').val() === "") {
                $('.tips').eq(0).removeClass('pass').addClass('warning').text("用户名不能为空");
                s.checkUserName = false;
            } else if ($('#username').val().length < 6) {
                $('.tips').eq(0).removeClass('pass').addClass('warning').text("用户名不能少于6位");
                s.checkUserName = false;
            } else if ($('#username').val().length > 18) {
                $('.tips').eq(0).removeClass('pass').addClass('warning').text("用户名不能多于18位");
                s.checkUserName = false;
            } else if (/^[0-9]([a-zA-Z_0-9]){5,17}$/.test($('#username').val())) {
                $('.tips').eq(0).removeClass('pass').addClass('warning').text("用户名必须以英文字母开头");
                s.checkUserName = false;
            } else if (/^\W([a-zA-Z_0-9]){5,17}$/.test($('#username').val())) {
                $('.tips').eq(0).removeClass('pass').addClass('warning').text("用户名必须以英文字母开头");
            } else if (/^[a-zA-Z]([a-zA-Z_0-9]){5,17}$/.test($('#username').val())) {
                $('.tips').eq(0).removeClass('warning').addClass('pass').text("用户名格式正确");
                s.checkUserName = true;
            } else {
                $('.tips').eq(0).removeClass('pass').addClass('warning').text("用户名含有非法字符");
                s.checkUserName = false;
            }
        });
    };

    s.password1Blur = function () {
        $('#password1').blur(function () {
            if ($('#password1').val() === "") {
                $('.tips').eq(1).removeClass('pass').addClass('warning').text("密码不能为空");
                s.checkPassword1 = false;
            } else if ($('#password1').val().length < 6) {
                $('.tips').eq(1).removeClass('pass').addClass('warning').text("密码不能少于6位");
                s.checkPassword1 = false;
            } else if ($('#password1').val().length > 12) {
                $('.tips').eq(1).removeClass('pass').addClass('warning').text("密码不能超过12位");
                s.checkPassword1 = false;
            } else if (/^([a-zA-Z_0-9\-]){6,12}$/.test($('#password1').val())) {
                $('.tips').eq(1).removeClass('warning').addClass('pass').text("密码格式正确");
                s.checkPassword1 = true;
            } else {
                $('.tips').eq(1).removeClass('pass').addClass('warning').text("密码含有非法字符");
                s.checkPassword1 = false;
            }
        });
    };

    s.password2Blur = function () {
        $('#password2').blur(function () {
            if ($('#password2').val() === "") {
                $('.tips').eq(2).removeClass('pass').addClass('warning').text("不能为空");
                s.checkPassword2 = false;
            } else if ($('#password2').val() != $('#password1').val()) {
                $('.tips').eq(2).removeClass('pass').addClass('warning').text("两次密码输入不一致");
                s.checkPassword2 = false;
            } else {
                $('.tips').eq(2).removeClass('warning').addClass('pass').text("两次密码输入一致");
                s.checkPassword2 = true;
            }
        });
    };

    s.studentIdBlur = function () {
        $('#studentId').blur(function () {
            if ($('#studentId').val() === "") {
                $('.tips').eq(3).removeClass('pass').addClass('warning').text("学号不能为空");
                s.checkStudentId = false;
            } else if (/^[0-9]{8}$/.test($('#studentId').val()) === false) {
                $('.tips').eq(3).removeClass('pass').addClass('warning').text("学号必须由8位数字组成");
                s.checkStudentId = false;
            } else if (/^0[0-9]{7}$/.test($('#studentId').val())) {
                $('.tips').eq(3).removeClass('pass').addClass('warning').text("学号首位不能为0");
                s.checkStudentId = false;
            } else {
                $('.tips').eq(3).removeClass('warning').addClass('pass').text("学号正确");
                s.checkStudentId = true;
            }
        });
    };

    s.phoneNumBlur = function () {
        $('#phoneNum').blur(function () {
            if ($('#phoneNum').val() === "") {
                $('.tips').eq(4).removeClass('pass').addClass('warning').text("电话号码不能为空");
                s.checkPhone = false;
            } else if (/^[0-9]{11}$/.test($('#phoneNum').val()) === false) {
                $('.tips').eq(4).removeClass('pass').addClass('warning').text("电话号码必须由11位数字组成");
                s.checkPhone = false;
            } else if (/^0[0-9]{10}$/.test($('#phoneNum').val())) {
                $('.tips').eq(4).removeClass('pass').addClass('warning').text("电话号码首位不能为0");
                s.checkPhone = false;
            } else {
                $('.tips').eq(4).removeClass('warning').addClass('pass').text("电话号码格式正确");
                s.checkPhone = true;
            }
        });
    };

    s.emailBlur = function () {
        $('#email').blur(function () {
            if ($('#email').val() === "") {
                $('.tips').eq(5).removeClass('pass').addClass('warning').text("邮箱不能为空");
                s.checkEmail = false;
            } else if (/^[a-zA-Z_0-9\-]+@(([0-9a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test($('#email').val())) {
                $('.tips').eq(5).removeClass('warning').addClass('pass').text("邮箱格式正确");
                s.checkEmail = true;
            } else {
                $('.tips').eq(5).removeClass('pass').addClass('warning').text("邮箱格式含有非法字符");
                s.checkEmail = false;
            }
        });
    };

    s.listenResetButton = function () {
        $('#reset').click(function () {
            $('.tips').text("");
            $('#username').val("");
            $('#password1').val("");
            $('#password2').val("");
            $('#studentId').val("");
            $('#phoneNum').val("");
            $('#email').val("");
        }.bind(this));
    };

    s.listenSubmitButton = function () {
        $("#submit").click(function (check) {
            $('#username').trigger("blur");    //上交表单的时候自动触发每个输入框的blur事件，以检验输入是否合法
            $('#password1').trigger("blur");
            $('#password2').trigger("blur");
            $('#studentId').trigger("blur");
            $('#phoneNum').trigger("blur");
            $('#email').trigger("blur");
            if (s.checkUserName === false || s.checkStudentId === false ||
                s.checkPhone === false || s.checkEmail === false || s.checkPassword1 === false || s.checkPassword2 === false) {
                alert("请正确填写表单！");
                check.preventDefault();     //如果输入不合法则禁止提交表单
            }
        }.bind(this));
    };
})();