/**
 * 用户信息
 */
var mongoose = require('./db'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    username : { type: String },                    //用户账号
    password: {type: String},                        //密码
    studentId: {type: Number},                        //学号
    phoneNum: {type: Number},                      //电话
    email: {type: String}                       //邮箱
});//  定义了一个新的模型，但是此模式还未和user集合有关联

exports.user = mongoose.model('user',UserSchema); //  构建model,处理文档交互