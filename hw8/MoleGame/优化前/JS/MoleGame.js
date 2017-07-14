/*
    Modern Web Programming(Group 10)
    Homework 6 Games
    MoleGame.js
    JS file for MoleGame.html
    Made by 舒俊淮
    Copyright By 舒俊淮 © 2016 All Rights Reserved.
    No.15331274
    School of Data and Computer Science
    Sun Yat-sen University
    2016-10-15
*/

window.onload = function() {
    var time = 30;
    var score = 0;
    var num;
    var start = false;
    var gameover = false;
    var helo = document.getElementsByTagName('button');
    var timeleft = document.getElementById('timeleft');
    var Score = document.getElementById('score');
    var t;

    //开始和暂定按钮
    document.getElementById('start_and_stop_button').onclick = function() {
        if (!start) {
            document.getElementById('status').value = "Playing";
            if (time === 0) {
                time = 30;
            }
            //记录下已经开始这个状态
            start = true;
            //如果是从上局的游戏结束开始的，那么清除上一局的积分
            if (gameover) {
                Score.value = 0;
                score = 0;
                gameover = false;
            } else {
                Score.value = score;    //如果是从暂停状态开始的，则不用置零积分
            }

            reset();
            //使得游戏开始，鼠标点击有用
            enable();
            //随机生成地鼠位置函数
            create_mole();
            //计时函数
            settime();
            //alert(start);
        } else {
            //alert("stop");
            document.getElementById('status').value = "Stop";
            //记录下暂停这个状态
            start = false;
            //停止计时
            stopCount();
            //暂停状态下不可以进行游戏
            disabled();
        }
    };

    function settime() {
        //alert("settime");
        if (time === 0) {   //检查游戏是否结束
            document.getElementById('status').value = "Game Over";
            timeleft.value = time;
            delete_mole();
            alert("Game Over!\nYour score is " + score + '.');

            //以下记录游戏结束的一系列状态
            gameover = true;
            stopCount();
            start = false;
            disabled();

            return;
        } else {
            timeleft.value = time;
            time--;
        }
        //检查哪个洞洞被点击了
        check();
        t = setTimeout(function() { 
        settime();
        },1000);
    }

    function stopCount() {
        clearTimeout(t);
    }

    function check() {
        for (var i = 1; i < helo.length; ++i) {
            helo[i].onclick = hit;
        }
    }

    //相应任何一个洞洞被点击的事件
    function hit() {
        if (this.value == 0) {
            score--;
            Score.value = score;
        } else {
            score++;
            Score.value = score;
            delete_mole();
            create_mole();
        }
    }

    function create_mole () {
        //得到一个0到1之间的随机数
        num = Math.random();
        //num*60的取值范围在0~60之间,使用向上取整就可以得到一个1~60的随机数
        num = Math.ceil(num * 60);
        helo[num].className="select";
        //helo[num].style.backgroundColor = "#8dd1e0";
        helo[num].value = 1;
    }

    function delete_mole() {
        helo[num].className="hole";
        //helo[num].style.backgroundColor = "white";
        helo[num].value = 0;
    }

    function reset() {
        for (var i = 1; i < helo.length; ++i) {
            helo[i].className="hole";
            helo[i].value = 0;
            //helo[i].style.backgroundColor = "white";
        } 
    }

    function disabled() {
        for (var i = 1; i < helo.length; ++i) {
            helo[i].disabled = true;
        }
    }

    function enable() {
        for (var i = 1; i < helo.length; ++i) {
            helo[i].disabled = false;
        }
    }
};