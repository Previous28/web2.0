/*
    Modern Web Programming(Group 10)
    Homework 7 Fifteen Puzzle
    Fifteen_Puzzle.js
    JS file for Fifteen_Puzzle.html
    Made by 舒俊淮
    Copyright By 舒俊淮 © 2016 All Rights Reserved.
    No.15331274
    School of Data and Computer Science
    Sun Yat-sen University
    2016-10-22
*/
window.onload = function () {
    var main = document.getElementById('main');
    var block_list = [];
    var blank = 15;
    var time=0;
    var best=1000;
    var t;
    var img = 1;
    for (var i = 0; i < 16; i++) {      //形成16个框框
        var block = document.createElement('div');
        main.appendChild(block);
        block_list.push(block);         //用一个list先存下所有的框框，方便接下来的使用
    }

    for (var j = 0; j < 16; j++) {      //给每个框框添加class和id
        block_list[j].className = "imag1 row" + ((j-j%4)/4+1) + " col" + ((j % 4)+1);
        block_list[j].id = "b" + (j+1);
    }

    document.getElementById('start').onclick = function () {    //一开始先各种初始化~
        shuffle();                  //洗牌~
        clearTimeout(t);
        new_game();
        document.getElementById("ori_img").className="";
    };

    document.getElementById("reset").onclick = reset;

    function reset () {             //还原图片位置，通过还原id来还原背景图片的位置
        document.getElementById('status').style.opacity = 0;
        document.getElementById('status').textContent = "";
        clearTimeout(t);
        for (var i = 0; i < 16; i++) {
            block_list[i].id = "b" + (i+1);
        }
        blank=15;
    }

    document.getElementById("change_img").onclick = function () {       //修改背景图片
        if (img === 1) {
            for (var i = 0; i < 16; i++) {
                block_list[i].className = "imag2 row" + ((i-i%4)/4+1) + " col" + ((i % 4)+1);
            }
            img = 2;
        } else if (img === 2) {
            for (var j = 0; j < 16; j++) {
                block_list[j].className = "imag3 row" + ((j-j%4)/4+1) + " col" + ((j % 4)+1);
            }
            img = 3; 
        } else if (img === 3) {
            for (var k = 0; k < 16; k++) {
                block_list[k].className = "imag1 row" + ((k-k%4)/4+1) + " col" + ((k % 4)+1);
            }
            img = 1;
        }
        document.getElementById("ori_img").className="";
        clearTimeout(t);
        reset();
    };

    document.getElementById("original").onclick = function () {
        document.getElementById("ori_img").className="ori_img"+img;
    };

    function shuffle () {
        for (var i = 2000; i > 0; i--) {        //2000提高数字的随机性
            var num = Math.floor(Math.random() * 16);   //1-16之间的随机数
            if (can_move(num))      //判断是否可以移动，即空白的框框在不在它的四周，这个判断是必要的，保证了打乱之后的图片能被还原
                exchange(num);
        }
    }

    function can_move (num) {       //判断当前选中的框框的四周有没有空白框框，有的话才能移动
        var blank_class = block_list[blank].className;
        var current_class = block_list[num].className;
        if (blank_class[9] === current_class[9] && blank_class[14] == (parseInt(current_class[14])-1)) {
            return true;
        } else if (blank_class[9] === current_class[9] && blank_class[14] == (parseInt(current_class[14])+1)) {
            return true;
        } else if (blank_class[14] === current_class[14] && blank_class[9] == (parseInt(current_class[9])-1)) {
            return true;
        } else if (blank_class[14] === current_class[14] && blank_class[9] == (parseInt(current_class[9])+1)) {
            return true;
        } else {
            return false;
        }
    }

    function exchange (num) {       //通过交换id来改变这个框框的背景图片的位置，模拟图片交换的效果
        var temp = block_list[num].id;
        block_list[num].id = block_list[blank].id;
        block_list[blank].id = temp;
        blank = num;
    }

    function new_game () {
        document.getElementById('status').style.opacity = 0;
        document.getElementById('status').textContent = "";
        time=0;
        for (var i = 0; i < 16; ++i) {
            block_list[i].onclick = check(i);
        }
        function check (i) {
            return function() {
                if (document.getElementById('status').textContent === "别想作弊") {
                    document.getElementById('status').style.opacity = 0;
                    document.getElementById('status').textContent = "";
                }
                if (can_move(i)) {
                    exchange(i);
                    if_win();
                }
            };
        }
        settime();
    }
    //判断是否赢
    function if_win () {
        var bool_win = 1;
        for (var i = 0; i < 16; ++i) {
            if (block_list[i].id != "b"+(i+1))
                bool_win = 0;
        }
        if (bool_win) {
            if (document.getElementById('status').textContent === "") {
                document.getElementById('status').style.opacity = 1;
                document.getElementById('status').textContent = "别想作弊";
            } else {
                document.getElementById('status').style.opacity = 1;
                if (time < best) {
                    best = time;
                    document.getElementById('status').textContent = "恭喜你，挑战成功并且打破了记录！"+"用时："+parseInt(time/60)+" m "+(time%60)+" s";
                    clearTimeout(t);
                } else {
                    document.getElementById('status').textContent = "恭喜你，挑战成功！"+"用时："+parseInt(time/60)+" m "+(time%60)+" s";
                    clearTimeout(t);
                }
            }
        } else {
            return;
        }
    }
    //简单的计时函数
    function settime() {
        time++;
        document.getElementById('status').style.opacity = 1;
        document.getElementById('status').textContent = "用时："+parseInt(time/60)+" m "+(time%60)+" s";
        t = setTimeout(function() { 
        settime();
        },1000);
    }
};