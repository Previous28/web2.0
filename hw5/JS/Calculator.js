/*
    Modern Web Programming(Group 10)
    Homework 5 Calculator
    Calculator.js
    javascript for Calculator.html
    Made by 舒俊淮
    Copyright By 舒俊淮 © 2016 All Rights Reserved.
    No.15331274
    School of Data and Computer Science
    Sun Yat-sen University
    2016-10-05
*/
window.onload = function() {
    var equation = "";
    var hidden = "";

    //输入
    function process() {
        if (equation.indexOf("=") != -1) {
            equation = "";
        }
        equation += this.id;
        if (equation.length > 30) {
            hidden = equation.substring(equation.length-29, equation.length);
            document.getElementById("content").innerHTML=hidden;
        } else {
            document.getElementById("content").innerHTML=equation;
        }
    }
    var button = document.getElementsByClassName("button_style");
    for (var i = 0; i < button.length; ++i)
        button[i].onclick = process;


    //退位
    document.getElementById("reduce").onclick = function () {
        if (equation.indexOf("=") != -1) {
            equation = "";
        } else {
            var temp = equation.substring(0,equation.length - 1);
            equation = temp;
        }
        if (equation.length > 30) {
            hidden = equation.substring(equation.length-29, equation.length);
            document.getElementById("content").innerHTML=hidden;
        } else {
            document.getElementById("content").innerHTML=equation;
        }
    };

    //复位
    document.getElementById("reset").onclick = function () {
        equation = "";
        document.getElementById("content").innerHTML=equation;
    };

    //求值
    document.getElementById("result").onclick = function() {
        if (equation === "") return;
        if (equation.indexOf("=") != -1) {
            return;
        }
        if (equation.indexOf("//") != -1) {
            alert("输入的等式非法!\n'/'多次重复！");
            equation = "";
            document.getElementById("content").innerHTML=equation;
            return;
        }
        var inx = equation.indexOf("(");
        if (inx != -1 && !isNaN(equation[inx - 1])) {
            alert("输入的等式非法!\n数字之后不能紧随括号！");
            equation = "";
            document.getElementById("content").innerHTML=equation;
            return;
        }
        var temp;
        try {
            temp = eval(equation);
            if (temp == "Infinity") {
                alert("输入的等式非法!\n0不能作为除数！");
                equation = "";
                document.getElementById("content").innerHTML=equation;
            } else {
                equation += "=" + temp;
                if (equation.length > 30) {
                    hidden = equation.substring(equation.length-29, equation.length);
                    document.getElementById("content").innerHTML=hidden;
                } else {
                    document.getElementById("content").innerHTML=equation;
                }
            }
        } catch(err) {
            var txt = "输入的等式非法!\n" + err.message + "\n";
            alert(txt);
            equation = "";
            document.getElementById("content").innerHTML=equation;
        }
    };
};