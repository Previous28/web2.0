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
        this.ListenMouseLeave();
        this.ListenapbClick();
    }
    var r = ringCalculator.prototype;

    function checkErr () {              //模拟随机错误
        var num = Math.floor(Math.random() * 100);
        if (num < 30) return 1;
        else return 0;
    }

    r.disable = function  (argument) {
        $('.mask').removeClass("blue").addClass("grey");
        $('.history').removeClass("blue").addClass("grey");
        $('.message').removeClass("blue").addClass("grey");
        $('.setting').removeClass("blue").addClass("grey");
        $('.sign').removeClass("blue").addClass("grey");
    };

    r.aHandler = function (randomArray,caller,errFromCallback,index,currentSum) {
        if (!!errFromCallback) {        //如果被调用者有错误信息传回，则处理它，并且继续执行自己的逻辑
            if ($(".mask .number").text() == "..."||$(".history .number").text() == "..."||
            $(".message .number").text() == "..."||$(".setting .number").text() == "..."||
            $(".sign .number").text() == "...") {
                $('#secretMessage').text(errFromCallback);
                r.randomClick(randomArray,randomArray[index],index,currentSum,r.aHandler);
            }
        } else {
            $(".mask .number").addClass("unread").text("...");
            r.disable();
            $.get("mask.txt",function (data) {
                var err=checkErr();
                if (err) {         //检查是否出错，如果出错，则传回{message，currentSum}
                    if ($(".mask .number").hasClass('unread') && $(".mask .number").text() == "...")
                        caller(randomArray,null,"这不是个天大的秘密",index,currentSum);
                } else {
                    if ($(".mask .number").hasClass('unread') && $(".mask .number").text() == "...") {
                        $('#secretMessage').text("这是个天大的秘密");
                        $(".mask .number").text(data);
                        currentSum = eval(data+'+'+currentSum);//从参数接收的累积和和自己取回的随机数相加
                        if (index < 4) {
                            r.randomClick(randomArray,randomArray[++index],index,currentSum,r.aHandler);
                        } else {
                            r.bubbleHandler(currentSum);
                        }
                    }
                }
            },"text");
        }
    };

    r.bHandler = function (randomArray,caller,errFromCallback,index,currentSum) {
        if (!!errFromCallback) {
            if ($(".mask .number").text() == "..."||$(".history .number").text() == "..."||
            $(".message .number").text() == "..."||$(".setting .number").text() == "..."||
            $(".sign .number").text() == "...") {
                $('#secretMessage').text(errFromCallback);
                r.randomClick(randomArray,randomArray[index],index,currentSum,r.bHandler);
            }
        } else {
            $(".history .number").addClass("unread").text("...");
            r.disable();
            $.get("history.txt",function (data) {
                var err=checkErr();
                if (err) {
                    if ($(".history .number").hasClass('unread') && $(".history .number").text() == "...")
                        caller(randomArray,null,"我知道",index,currentSum);
                } else {
                    if ($(".history .number").hasClass('unread') && $(".history .number").text() == "...") {
                        $('#secretMessage').text("我不知道");
                        $(".history .number").text(data);
                        currentSum = eval(data+'+'+currentSum);
                        if (index < 4) {
                            r.randomClick(randomArray,randomArray[++index],index,currentSum,r.bHandler);
                        } else {
                            r.bubbleHandler(currentSum);
                        }
                    }
                }
            },"text");
        }
    };

    r.cHandler = function (randomArray,caller,errFromCallback,index,currentSum) {
        if (!!errFromCallback) {
            if ($(".mask .number").text() == "..."||$(".history .number").text() == "..."||
            $(".message .number").text() == "..."||$(".setting .number").text() == "..."||
            $(".sign .number").text() == "...") {
                $('#secretMessage').text(errFromCallback);
                r.randomClick(randomArray,randomArray[index],index,currentSum,r.cHandler);
            }
        } else {
            $(".message .number").addClass("unread").text("...");
            r.disable();
            $.get("message.txt",function (data) {
                var err=checkErr();
                if (err) {
                    if ($(".message .number").hasClass('unread') && $(".message .number").text() == "...")
                        caller(randomArray,null,"你知道",index,currentSum);
                } else {
                    if ($(".message .number").hasClass('unread') && $(".message .number").text() == "...") {
                        $('#secretMessage').text("你不知道");
                        $(".message .number").text(data);
                        currentSum = eval(data+'+'+currentSum);
                        if (index < 4) {
                            r.randomClick(randomArray,randomArray[++index],index,currentSum,r.cHandler);
                        } else {
                            r.bubbleHandler(currentSum);
                        }
                    }
                }
            },"text");
        }
    };

    r.dHandler = function (randomArray,caller,errFromCallback,index,currentSum) {
        if (!!errFromCallback) {
            if ($(".mask .number").text() == "..."||$(".history .number").text() == "..."||
            $(".message .number").text() == "..."||$(".setting .number").text() == "..."||
            $(".sign .number").text() == "...") {
                $('#secretMessage').text(errFromCallback);
                r.randomClick(randomArray,randomArray[index],index,currentSum,r.dHandler);
            }
        } else {
            $(".setting .number").addClass("unread").text("...");
            r.disable();
            $.get("setting.txt",function (data) {
                var err=checkErr();
                if (err) {
                    if ($(".setting .number").hasClass('unread') && $(".setting .number").text() == "...")
                        caller(randomArray,null,"他知道",index,currentSum);
                } else {
                    if ($(".setting .number").hasClass('unread') && $(".setting .number").text() == "...") {
                        $('#secretMessage').text("他不知道");
                        $(".setting .number").text(data);
                        currentSum = eval(data+'+'+currentSum);
                        if (index < 4) {
                            r.randomClick(randomArray,randomArray[++index],index,currentSum,r.dHandler);
                        } else {
                            r.bubbleHandler(currentSum);
                        }
                    }
                }
            },"text");
        }
    };

    r.eHandler = function (randomArray,caller,errFromCallback,index,currentSum) {
        if (!!errFromCallback) {
            if ($(".mask .number").text() == "..."||$(".history .number").text() == "..."||
            $(".message .number").text() == "..."||$(".setting .number").text() == "..."||
            $(".sign .number").text() == "...") {
                $('#secretMessage').text(errFromCallback);
                r.randomClick(randomArray,randomArray[index],index,currentSum,r.eHandler);
            }
        } else {
            $(".sign .number").addClass("unread").text("...");
            r.disable();
            $.get("sign.txt",function (data) {
                var err=checkErr();
                if (err) {
                    if ($(".sign .number").hasClass('unread') && $(".sign .number").text() == "...")
                        caller(randomArray,null,"没错",index,currentSum);
                } else {
                    if ($(".sign .number").hasClass('unread') && $(".sign .number").text() == "...") {
                        $('#secretMessage').text("才怪");
                        $(".sign .number").text(data);
                        currentSum = eval(data+'+'+currentSum);
                        if (index < 4) {
                            r.randomClick(randomArray,randomArray[++index],index,currentSum,r.eHandler);
                        } else {
                            r.bubbleHandler(currentSum);
                        }
                    }
                }
            },"text");
        }
    };

    r.randomClick = function (randomArray,id,index,currentSum,caller) {
        if (id === 'A')
            this.aHandler(randomArray,caller,"",index,currentSum);
        else if (id === 'B')
            this.bHandler(randomArray,caller,"",index,currentSum);
        else if (id === 'C')
            this.cHandler(randomArray,caller,"",index,currentSum);
        else if (id === 'D')
            this.dHandler(randomArray,caller,"",index,currentSum);
        else
            this.eHandler(randomArray,caller,"",index,currentSum);
    };

    function randomSort(a, b) {  
        return Math.random()>0.5 ? -1 : 1;  
    }

    function firstCaller(randomArray,caller,errFromCallback,index,currentSum) { //作为第一个调用者，处理第一个回调回来的错误信息
        if (!!errFromCallback) {
            $('#secretMessage').text(errFromCallback);
            r.randomClick(randomArray,randomArray[index],index,currentSum,firstCaller);
        }
    }

    r.ListenapbClick = function (event) {
        $('.apb').click(function(){
            var buttonArray = ['A','B','C','D','E'];
            var randomArray = buttonArray.sort(randomSort);       //生成随机数组
            $('#order').text("顺序:"+randomArray);
            var index = 0;
            r.randomClick(randomArray,randomArray[index],index++,0,firstCaller);
            $('.apb').unbind("click");          //在计算器重置之前@+只能点击一次
        }.bind(this));
    };

    r.ListenMouseLeave = function () {      //鼠标离开@+区域，将重置整个计算器，清除所有A~E按钮的随机数和大气泡内的和
        $('#button').mouseleave(function () {
            $(".number").removeClass("unread").text("");
            $('#sum').text("");
            $('#order').text("");
            $('#secretMessage').text("");
            $(".button").removeClass("grey").addClass("blue");
            r.ListenapbClick();
            event.stopPropagation();
        }.bind(this));
    };

    r.bubbleHandler = function (currentSum) {
        $('#sum').text("楼主异步调用战斗力感人，目测不超过"+currentSum);
    };
})();