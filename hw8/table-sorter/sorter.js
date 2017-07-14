/*
    Modern Web Programming(Group 10)
    Homework 8 Sorter Table
    sorter.js
    JS file for index.html
    Made by 舒俊淮
    Copyright By 舒俊淮 © 2016 All Rights Reserved.
    No.15331274
    School of Data and Computer Science
    Sun Yat-sen University
    2016-10-31
*/
$(document).ready(function () {
    $("th").addClass("original");

    var LastClick;

    $("th").click(
        function () {
            if (LastClick) $(LastClick).addClass("original");   //还原上次点击的列的表头样式
            if (LastClick === this) {$(this).toggleClass("ascend").toggleClass("descend").removeClass("original");}
            else {$(this).attr('class','ascend');}
            LastClick = this;
            AscendOrDescend($(this), $("thead th").index($(this)));     //每次点击都产生一个结果：按该列排序
        }
    );

    function AscendOrDescend (CurrentHead, CurrentCol) {        //判断是升序排序还是降序排序
        var IsAscend;
        if (CurrentHead.hasClass("ascend")) IsAscend = true;
        else IsAscend = false;
        if (CurrentCol < 3) DoSort("#todo", CurrentCol, IsAscend);
        else DoSort("#staff", CurrentCol - 3, IsAscend);
    }

    function DoSort (CurrentTable, CurrentCol, IsAscend) {
        var RowList = $(CurrentTable + " tbody tr");        //获取要排序的表格的所有tr元素
        _.times(RowList.length - 1, function (i) {          //冒泡排序
            _.times(RowList.length - 1 - i, function (j) {
                Swap(RowList[j], RowList[j+1], CurrentCol, IsAscend);
            });
        });
    }

    function Swap (Row1, Row2, CurrentCol, IsAscend) {
        var TempDataA = $(Row1).find("td").eq(CurrentCol);      //找到对应当前行当前列的td元素，作为比较的主体
        var TempDataB = $(Row2).find("td").eq(CurrentCol);
        if (((TempDataA.html() > TempDataB.html()) && IsAscend === true) || ((TempDataA.html() < TempDataB.html()) && IsAscend === false)) {
            var Temp = $(Row1).html();
            $(Row1).html($(Row2).html());
            $(Row2).html(Temp);
        }
    }
});