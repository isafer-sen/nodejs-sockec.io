//导入express 
var express=require("express");
//创建应用
var app=express();
//设置静态资源服务
app.use(express.static("node_modules"));
//创建http服务
var server=require("http").Server(app);
//创建socket服务
var io=require("socket.io")(server);
//设置模板引擎类型
app.set("view engine","ejs");
//设置模板存放路径
app.set("views","./views");
//设置路由
app.get("/",function(req,res){
   //加载客户端模板
   res.render("chat");
});
//设置监听端口号
server.listen(8090);
io.on('connection',function(socket){
	socket.emit("news",{msg:'hello world'});
        socket.on('news',function(data){
		console.log(data);
		//把消息统一发给所有用户broadcast是统一广播
		socket.broadcast.emit('news',data);
	});
});
