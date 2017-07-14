一行神秘代码：
(function () {var IsAscend = true;$("th").click(function () {AscendOrDescend($(this), $("thead th").index($(this)));});function AscendOrDescend (CurrentHead, CurrentCol) {if (IsAscend) { DoSort(CurrentCol, IsAscend); IsAscend = false;}else {DoSort(CurrentCol, IsAscend); IsAscend = true;}}function DoSort (CurrentCol, IsAscend) {var RowList = $("tbody tr");for (var i = 0; i < RowList.length - 1; ++i) {for (var j = 0; j < RowList.length - 1 - i; ++j) {Swap(RowList[j], RowList[j+1], CurrentCol, IsAscend);}}}function Swap (Row1, Row2, CurrentCol, IsAscend) {var TempDataA = $(Row1).find("td").eq(CurrentCol);var TempDataB = $(Row2).find("td").eq(CurrentCol);if (((TempDataA.text() > TempDataB.text()) && IsAscend === true) || ((TempDataA.text() < TempDataB.text()) && IsAscend === false)) {var Temp = $(Row1).html();$(Row1).html($(Row2).html());$(Row2).html(Temp);}}})();

可排序网站：
http://soj.sysu.edu.cn/courses.php
http://www.kuaidaili.com/
http://acm.swust.edu.cn/contest/list/
http://acm.swust.edu.cn/problem/list/