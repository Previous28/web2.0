/*
    Modern Web Programming(Group 10)
    Homework 6 Games
    Maze.js
    JS file for Maze.html
    Made by 舒俊淮
    Copyright By 舒俊淮 © 2016 All Rights Reserved.
    No.15331274
    School of Data and Computer Science
    Sun Yat-sen University
    2016-10-16
*/
window.onload = function () {
    var start = false;
    var lose;
    var exit;
    var wall = document.getElementsByClassName('wall');

    document.getElementById('start').onmouseover = function () {
        start = true;       //开始时初始化一切flag
        exit = false;
        lose = false;
        document.getElementById('result').style.opacity = 0;
        document.getElementById('result').innerHTML = " ";
        reset();            //初始化墙壁状态
        check();            //遍历检查墙壁是否被碰
    };

    //检查是否出界
    document.getElementById('main').onmouseleave = function () {
        if (start === true)
            exit = true;
    };

    //检查到了end板块时，是什么状态：作弊、碰墙、或者赢了
    document.getElementById('end').onmouseover = function () {
        if (start === true && exit === false && lose === false) {
            document.getElementById('result').style.opacity = 1;
            document.getElementById('result').innerHTML = "You Win!";
            start = false;
        } else if (start === true && exit === true && lose === false) {
            document.getElementById('result').style.opacity = 1;
            document.getElementById('result').innerHTML = "Don't cheat, you should start form the 's' and move to the 'E' inside the maze!";
            lose = true;
        } else if (start === false) {       //如果用户未经过S，就指到E，视为作弊
            document.getElementById('result').style.opacity = 1;
            document.getElementById('result').innerHTML = "Don't cheat, you should start form the 's' and move to the 'E' inside the maze!";
            lose = true;
        }
    };

    function reset () {
        for (var i = 0; i < wall.length; ++i) {
            wall[i].className="wall";
        }
    }

    function check() {
        for (var i = 0; i < wall.length; ++i) {
            wall[i].onmouseover = if_lose;
        }
        for (i = 0; i < wall.length; ++i) {
            wall[i].onmouseout = function () {
                this.className="wall";
            };
        } 
    }

    function if_lose() {
        if (start === true && lose === false) {
            this.className="redwall";   //碰到的墙壁变红色
            lose = true;                //记下失败的信息
            start = false;
            document.getElementById('result').style.opacity = 1;
            document.getElementById('result').innerHTML = "You Lose!";
        }
    }
};