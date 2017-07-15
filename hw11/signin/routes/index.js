var express = require('express');
var router = express.Router();
var user = require('../model/user').user;
var crypto = require('crypto');
var signinErr = 0;      //记录登录失败的情况
var registErr = 0;      //记录注册失败的状态，约定每个数字表示不同的失败原因
var detailErr = 0;      //记录访问限制，不可以访问他人的信息
var tUser = {};
var oldPassword;
var oldUsername;        //记录当前尝试登录的用户名

/*login*/
router.get('/', function(req, res) {
    var queryUser = req.query.username;
    console.log(queryUser);
    if (req.session.user && queryUser) {        //先检测url中是否有查询请求
        if (queryUser === req.session.user.username) {      //检测查找的是否是当前用户的详细信息
            detailErr = 0;
            res.redirect('detail');
        } else {
            detailErr = 1;                      //记录试图访问其他用户信息这个错误行为
            res.redirect('detail');
        }
    } else if (req.session.user) {res.redirect('detail');       //如果登录后想试图访问登录界面直接跳转到详情界面
    } else if (signinErr === 0) {
        res.render('index', { title: '登录', username: '', error: ''});
    } else {
        signinErr = 0;
        res.render('index', { title: '登录', username: oldUsername, error: '错误的用户名或者密码!'});
    }
});

/*detail*/
router.post('/', function(req, res) {
    var cryptoPassword = req.body.password;
    cryptoPassword = crypto.createHash('md5').update(cryptoPassword).digest('hex');     //密码加密

    console.log("这里是登录检查");
    oldUsername = req.body.username;
    var query_doc = {username: req.body.username, password: cryptoPassword};
    (function(){
        user.count(query_doc, function(err, doc){       //检查是否存在该注册用户
            if(doc == 1){
                var tempUser = user.findOne(query_doc, function(err, tempUser){     //存在该用户则读取显示数据
                  if (!err) {
                        //console.log(tempUser);
                        console.log(query_doc.username + ": login success in " + new Date());
                        req.session.user = tempUser;
                        console.log(req.session.user);
                        detailErr = 0;
                        res.redirect('detail');
                  } else {
                      console.log('Somthing wrong: ' + err);
                  }
                });
            } else {                //不存在则登录失败
                console.log(query_doc.username + ": login failed in " + new Date());
                signinErr = 1;
                res.redirect('/');
            }
        });
    })(query_doc);
});

/*regist*/
router.get('/regist', function(req, res) {
    if (registErr === 0) {      //0:no error
        res.render('regist', { title: '用户注册',
                            username: '', nameTip: '',
                            password: '', studentId: '', idTip: '',
                            phoneNum: '', phoneTip: '',
                            email: '', emailTip: ''
                            });
    } else if (registErr == 1) {      //1:username repeat
        registErr = 0;
        res.render('regist', { title: '用户注册',
                            username: tUser.username, nameTip: '用户名已存在!',
                            password: oldPassword, studentId: tUser.studentId, idTip: '',
                            phoneNum: tUser.phoneNum, phoneTip: '',
                            email: tUser.email, emailTip: ''
                            });
    } else if (registErr == 2) {        //2: id repeat
        registErr = 0;
        res.render('regist', { title: '用户注册',
                            username: tUser.username, nameTip: '',
                            password: oldPassword, studentId: tUser.studentId, idTip: '该学号已经被注册!',
                            phoneNum: tUser.phoneNum, phoneTip: '',
                            email: tUser.email, emailTip: ''
                            });
    } else if (registErr == 3) {        //3: phone number repeat
        registErr = 0;
        res.render('regist', { title: '用户注册',
                            username: tUser.username, nameTip: '',
                            password: oldPassword, studentId: tUser.studentId, idTip: '',
                            phoneNum: tUser.phoneNum, phoneTip: '该手机号码已经被注册!',
                            email: tUser.email, emailTip: ''
                            });
    } else if (registErr == 4) {        //4: email repeat
        registErr = 0;
        res.render('regist', { title: '用户注册',
                            username: tUser.username, nameTip: '',
                            password: oldPassword, studentId: tUser.studentId, idTip: '',
                            phoneNum: tUser.phoneNum, phoneTip: '',
                            email: tUser.email, emailTip: '该邮箱已经被注册!'
                            });
    }
});
 
/*after regist*/
router.post('/afterRegist', function(req, res) {
    var cryptoPassword = req.body.password;
    oldPassword = req.body.password;
    cryptoPassword = crypto.createHash('md5').update(cryptoPassword).digest('hex');     //密码加密
    //console.log("这里是注册检查");
    //console.log(cryptoPassword);
    tUser = {username: req.body.username,
                     password: cryptoPassword,     //密码加密
                     studentId: req.body.studentId,
                     phoneNum: req.body.phoneNum,
                     email: req.body.email};
    (function(){    //用户名重复、学号重复、手机重复、邮箱重复等检查
        user.count({username: tUser.username}, function(err, doc1){
            if (doc1 === 1) {
                registErr = 1;
                console.log(registErr);
                res.redirect('regist');
            } else {
                user.count({studentId: tUser.studentId}, function(err, doc2){
                    if (doc2 === 1) {
                        registErr = 2;
                        console.log(registErr);
                        res.redirect('regist');
                    } else {
                        user.count({phoneNum: tUser.phoneNum}, function(err, doc3){
                            if (doc3 === 1) {
                                registErr = 3;
                                console.log(registErr);
                                res.redirect('regist');
                            } else {
                                user.count({email: tUser.email}, function(err, doc4){
                                    if (doc4 === 1) {
                                        registErr = 4;
                                        console.log(registErr);
                                        res.redirect('regist');
                                    } else {
                                        var user_ = new user(tUser).save(function(err){
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log('The new user is saved');
                                            }
                                        });
                                        res.render('afterRegist', { title: '注册成功', 
                                                                    username: tUser.username,
                                                                    studentId: tUser.studentId,
                                                                    phoneNum: tUser.phoneNum,
                                                                    email: tUser.email});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    })(tUser);
});

/*signout*/
router.post('/signout', function(req, res, next) {
    console.log(req.session.user.username + ": logout success in " + new Date());
    delete req.session.user;
    res.redirect('/');
});

//处理未登录就进入详情页面的情况
router.all('/detail', function(req, res, next){
    req.session.user ? next() : res.redirect('/');
});

//detail router
router.get('/detail', function(req, res, next) {
    if (req.session.user && detailErr === 0) {
        res.render('detail', { title: '用户详情' ,
                                username: req.session.user.username,
                                studentId: req.session.user.studentId,
                                phoneNum: req.session.user.phoneNum,
                                email: req.session.user.email,
                                errorMsg: '' });
    } else if (req.session.user && detailErr == 1){
        detailErr = 0;
        res.render('detail', { title: '用户详情' ,
                                username: req.session.user.username,
                                studentId: req.session.user.studentId,
                                phoneNum: req.session.user.phoneNum,
                                email: req.session.user.email,
                                errorMsg: '只能够访问自己的数据' });
    }
});

module.exports = router;