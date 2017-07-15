/*
    Modern Web Programming(Group 10)
    Homework 10 Asynchronous JavaScript
    index.js
    JS file for index.html
    Made by 舒俊淮
    Copyright By 舒俊淮 © 2016 All Rights Reserved.
    No.15331274
    School of Data and Computer Science
    Sun Yat-sen University
    2016-11-21
*/

(function () {
    $(function () { new ringCalculator(); });

    function ringCalculator () {
        //this.ListenButtonClick();
        this.ListenMouseLeave();
        this.ListenapbClick();
    }
    var r = ringCalculator.prototype;

    r.ListenButtonClick = function(){
        this.ListenMaskClick();
        this.ListenHistoryClick();
        this.ListenMessageClick();
        this.ListenSettingClick();
        this.ListenSignClick();
    };

    r.ListenMaskClick = function () {
        $(".mask").click(function (event) {
            $(".mask .number").addClass("unread").text("...");
            $.get("/",function (data) {             //请求的URL,只要不是服务器规定的几种形式，服务器端都会返回随机数
                if ($(".mask .number").hasClass('unread') && $(".mask .number").text() == "...") {
                    $(".mask .number").text(data);
                    r.check();          //激活其余按钮，呈现为蓝色，用户可以点击，从服务器获取随机数
                    r.checkIfCanSum();
                    $(".history").trigger("click");     //模拟点击下一个按钮
                }
            },"text");
            r.disable();        //灭活按钮，变为灰色，用户不能够点击
        }.bind(this));
    };

    r.check = function () {
        if ($(".mask .number").text() === "") {
            r.ListenMaskClick();
            $('.mask').addClass("blue").removeClass("grey");
        }
        if ($(".history .number").text() === "") {
            r.ListenHistoryClick();
            $('.history').addClass("blue").removeClass("grey");
        }
        if ($(".message .number").text() === "") {
            r.ListenMessageClick();
            $('.message').addClass("blue").removeClass("grey");
        }
        if ($(".setting .number").text() === "") {
            r.ListenSettingClick();
            $('.setting').addClass("blue").removeClass("grey");
        }
        if ($(".sign .number").text() === "") {
            r.ListenSignClick();
            $('.sign').addClass("blue").removeClass("grey");
        }
    };

    r.disable = function  (argument) {
        $('.mask').unbind("click").removeClass("blue").addClass("grey");
        $('.history').unbind("click").removeClass("blue").addClass("grey"); //移除click
        $('.message').unbind("click").removeClass("blue").addClass("grey");
        $('.setting').unbind("click").removeClass("blue").addClass("grey");
        $('.sign').unbind("click").removeClass("blue").addClass("grey");
    };

    r.ListenHistoryClick = function () {
        $(".history").click(function (event) {
            $(".history .number").addClass("unread").text("...");
            $.get("/",function (data) {
                if ($(".history .number").hasClass('unread') && $(".history .number").text() == "...") {
                    $(".history .number").text(data);
                    r.check();
                    r.checkIfCanSum();
                    $(".message").trigger("click");     //模拟点击下一个按钮
                }
            },"text");
            r.disable();
        }.bind(this));
    };

    r.ListenMessageClick = function () {
        $(".message").click(function (event) {
            $(".message .number").addClass("unread").text("...");
            $.get("/",function (data) {
                if ($(".message .number").hasClass('unread') && $(".message .number").text() == "...") {
                    $(".message .number").text(data);
                    r.check();
                    r.checkIfCanSum();
                    $(".setting").trigger("click");     //模拟点击下一个按钮
                }
            },"text");
            r.disable();
        }.bind(this));
    };

    r.ListenSettingClick = function () {
        $(".setting").click(function (event) {
            $(".setting .number").addClass("unread").text("...");
            $.get("/",function (data) {
                if ($(".setting .number").hasClass('unread') && $(".setting .number").text() == "...") {
                    $(".setting .number").text(data);
                    r.check();
                    r.checkIfCanSum();
                    $(".sign").trigger("click");        //模拟点击下一个按钮
                }
            },"text");
            r.disable();
        }.bind(this));
    };

    r.ListenSignClick = function () {
        $(".sign").click(function (event) {
            $(".sign .number").addClass("unread").text("...");
            $.get("/",function (data) {
                if ($(".sign .number").hasClass('unread') && $(".sign .number").text() == "...") {
                    $(".sign .number").text(data);
                    r.check();
                    r.checkIfCanSum();
                    $("#info-bar").trigger("click");        //模拟点击求和大气泡
                }
            },"text");
            r.disable();
        }.bind(this));
    };

    r.ListenMouseLeave = function () {      //鼠标离开@+区域，将重置整个计算器，清除所有A~E按钮的随机数和大气泡内的和
        $('#button').mouseleave(function () {
            $(".number").removeClass("unread").text("");
            $('#sum').text("");
            $(".button").removeClass("grey").addClass("blue");
            $('#info-bar').unbind("click");
            r.ListenapbClick();
        }.bind(this));
    };

    r.ListenSumClick = function () {
        $("#info-bar").click(function () {
            var sum = $(".mask .number").text()+'+'+$(".history .number").text()+'+'+$(".message .number").text()+
            '+'+$(".setting .number").text()+'+'+$(".sign .number").text();
            $('#sum').text(eval(sum));          //计算A~E随机数的和，显示在大气泡内
            $('#info-bar').unbind("click");     //灭活大气泡
        }.bind(this));
    };

    r.checkIfCanSum = function () {
        if (/^[0-9]{1,2}$/.test($(".mask .number").text())&&/^[0-9]{1,2}$/.test($(".history .number").text())&&
            /^[0-9]{1,2}$/.test($(".message .number").text())&&/^[0-9]{1,2}$/.test($(".setting .number").text())&&
            /^[0-9]{1,2}$/.test($(".sign .number").text())&&$('#sum').text()==="") {
            r.ListenSumClick();     //当A~E按钮全部获得了自己的随机数时，激活大气泡
        } else {
            $('#info-bar').unbind("click");     //在A~E未能全部得到自己的随机数之前,灭活大气泡，用户不能够点击
        }
    };

    r.ListenapbClick = function () {
        $('.apb').click(function(){
            r.ListenButtonClick();
            $(".mask").trigger("click");       //模拟执行点击.mask的事件（第一个按钮）
            $('.apb').unbind("click");          //在计算器重置之前@+只能点击一次 
        }.bind(this));
    };
})();