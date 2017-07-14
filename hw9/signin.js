/*
    Modern Web Programming(Group 10)
    Homework 9 Sign Up
    signin.js
    nodejs file
    Made by 舒俊淮
    Copyright By 舒俊淮 © 2016 All Rights Reserved.
    No.15331274
    School of Data and Computer Science
    Sun Yat-sen University
    2016-11-15
*/
var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var querystring = require('querystring');
var userList = [];      //临时存放已经注册的用户

var server = http.createServer(function(request, response) {
    //首先检查是否是查询用户的url
    var queryUser = url.parse(request.url, true).query;
    //如果存在这个查询用户，则显示用户详情
    if (userExit(queryUser)) {
        var UserObject = getUserObject(queryUser);
        detailPage(UserObject, request, response);
    }
    //如果不存在这个用户，则显示正常的注册页面
    newPage(request, response);

    if (request.method == 'POST') {
        userRegister(request, response, userList);
    }

});

server.listen(8000, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8000/");

function userRegister (request, response, userList) {
    var postData = '';

    request.on('data', function(data){    //通过request的data事件监听函数，每当接受到请求体的数据，就累加到postData变量中
        postData += data;
    });

    request.on('end', function(){
        //console.log(post);
        var postObject = querystring.parse(postData);
        var usernameRepeat = false, studentIdRepeat = false, phoneNumRepeat = false, emailRepeat = false;
        //首先检查各个信息是否重复
        for (var i = 0; i < userList.length; ++i) {
            if (userList[i].username === postObject.username) {
                usernameRepeat = true;
                break;
            } else if (userList[i].studentId === postObject.studentId) {
                studentIdRepeat = true;
                break;
            } else if (userList[i].phoneNum === postObject.phoneNum) {
                phoneNumRepeat = true;
                break;
            } else if (userList[i].email === postObject.email) {
                emailRepeat = true;
                break;
            }
        }
        //console.log(userList);
        //console.log(usernameRepeat + ' ' + studentIdRepeat + ' ' + phoneNumRepeat + ' ' + emailRepeat);
        //如果信息重复，则注册不成功，显示重复的信息
        if (usernameRepeat||studentIdRepeat||phoneNumRepeat||emailRepeat) {
            if (usernameRepeat) informationRepeat(postObject,request,response,1);
            else if (studentIdRepeat) informationRepeat(postObject,request,response,2);
            else if (phoneNumRepeat) informationRepeat(postObject,request,response,3);
            else informationRepeat(postObject,request,response,4);
        } else {
            userList.push(postObject);      //如果注册成功，则把这个用户的信息存起来
            detailPage(postObject, request, response);  //并且动态生成详情页面
            //console.log(userList);
        }
    });
}

function newPage (request, response) {
    var pathname = __dirname + url.parse(request.url).pathname;
    if (path.extname(pathname) === "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {  //如果什么扩展名都没有，就默认是html文件
        pathname += "index.html";
    }
    //根据不同的扩展名来返回不同类型的文件数据
    if (path.isAbsolute(pathname)) {
        switch (path.extname(pathname)) {
            case ".html":
                response.writeHead(200, {
                    "Content-Type": "text/html"
                });
                break;
            case ".js":
                response.writeHead(200, {
                    "Content-Type": "text/javascript"
                });
                break;
            case ".css":
                response.writeHead(200, {
                    "Content-Type": "text/css"
                });
                break;
            case ".gif":
                response.writeHead(200, {
                    "Content-Type": "image/gif"
                });
                break;
            case ".jpg":
                response.writeHead(200, {
                    "Content-Type": "image/jpeg"
                });
                break;
            case ".png":
                response.writeHead(200, {
                    "Content-Type": "image/png"
                });
                break;
            default:
                response.writeHead(200, {
                    "Content-Type": "application/octet-stream"
                });
        }
        //从文件读取
        fs.readFile(pathname.toString(), function(err,data) {
            response.end(data);
        });
    } else {
        response.writeHead(404, {
            "Content-Type": "text/html"
        });
        response.end("<h1>404 Not Found</h1>");
    }
}
//根据特定的用户信息动态生成详情页面
function detailPage (postObject, request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write(`<style type='text/css'>
        body {
            font-family: "幼圆";
            background-color: #afcafb;
        }
        h1 {
            text-align: center;
            color: white;
        }
        #mainBox {
            height: 223px;
            width: 278px;
            margin: 0 auto;
            background-color: white;
            border-radius: 20px;
        }
        input {
            background-color: white;
            border-radius: 4px;
            border: none;
            padding: 5px 8px 4px 7px;
            margin: 13px 0px 0px 235px;
        }
        p {text-align: center;font-size: 16pt;padding-top: 10px;}
        </style>`
    );
    response.write(`<script>
        function back(){
            window.location.assign("/");
        }
        </script>`
    );
    response.write("<title>User Detail</title>");
    response.write("<meta charset=\'utf-8\' />");
    response.write("</head>");
    response.write("<body>");
    response.write("<h1>用户详情</h1>"+
                    "<div id=\"mainBox\">"+
                    "<p>用户名: " + postObject.username + "</p></ br>" +
                    "<p>学号: " + postObject.studentId + "</p></ br>" +
                    "<p>电话: " + postObject.phoneNum + "</p></ br>" +
                    "<p>邮箱: " + postObject.email + "</p></ br>" +
                    "<input type=\"button\" value=\"返回\" onclick=\"back()\">" +
                    "</div>"
        );
    response.write("</body>");
    response.write("</html>");
    response.end();
}
//根据重复的信息动态生成重复页面
function informationRepeat (postObject,request,response,id) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <link href="/css/index.css" type="text/css" rel="stylesheet" />
                    <script src="/js/jQuery.js"></script>
                    <script type="text/javascript" src="/js/index.js"></script>
                    <title>Sign Up</title>`
    );
    response.write("</head>");
    response.write("<body>");
    response.write(`<h1 id="head">用户注册</h1>
        <div id="mainBox">
            <form action="http://localhost:8000/" method="post">`
    );
    response.write("<div class=\"messages\"><span class=\"keys\">用户名:</span><input type=\"text\" name=\'username\' id=\'username\'"+
        "value="+postObject.username+"></div>");
    if (id === 1) {
        response.write("<div class=\"tips warning\">用户名已存在</div>");
    } else {
        response.write("<div class=\"tips pass\">用户名格式正确</div>");
    }
    response.write("<div class=\"messages\"><span class=\"keys\">学号:</span><input type=\"text\" name=\'studentId\' id=\'studentId\'"+
        "value="+postObject.studentId+"></div>");
    if (id === 2) {
        response.write("<div class=\"tips warning\">该学号已经被注册</div>");
    } else {
        response.write("<div class=\"tips pass\">学号正确</div>");
    }
    response.write("<div class=\"messages\"><span class=\"keys\">电话:</span><input type=\"text\" name=\'phoneNum\' id=\'phoneNum\'"+
        "value="+postObject.phoneNum+"></div>");
    if (id === 3) {
        response.write("<div class=\"tips warning\">该手机号码已经被注册</div>");
    } else {
        response.write("<div class=\"tips pass\">电话号码格式正确</div>");
    }
    response.write("<div class=\"messages\"><span class=\"keys\">邮箱:</span><input type=\"text\" name=\'email\' id=\'email\'"+
        "value="+postObject.email+"></div>");
    if (id === 4) {
        response.write("<div class=\"tips warning\">该邮箱已经被注册</div>");
    } else {
        response.write("<div class=\"tips pass\">邮箱格式正确</div>");
    }
    response.write(`<div>
                <input type="button" id='reset' value="重置" class="button">
                <input type="submit" id='submit' value="提交" class="button">
                </div>
            </form>
        </div>`
    );
    response.write("</body>");
    response.write("</html>");
    response.end();
}
//检查该查询用户是否已经注册
function userExit (queryUser) {
    for (var i = 0; i < userList.length; ++i)
        if (queryUser.username === userList[i].username)
            return true;
    return false;
}
//根据查询的用户名返回该用户的所有信息
function getUserObject (queryUser) {
    for (var i = 0; i < userList.length; ++i)
        if (queryUser.username === userList[i].username)
            return userList[i];
}