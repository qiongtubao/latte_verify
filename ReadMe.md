# latte_verify
###  描述
    验证数据
###  安装
    npm install latte_verify
###  使用
```javascript
   var latte_verify = require("latte_verify");
	latte_verify.verify({//数据
		name: "latte_verify"
	},
	{
		type: "object", //验证规范
		properties:{
	      	name: {
	      		type: "string"
	      	}
	    }
 	}, function(err, data) {
	 		if(err) {
	        	//验证失败
	        }
	        console.log(data);//返回的数据
	 });
```

[详细文档可查看](http://www.kancloud.cn/qiongtubao/latte_verify/248582)
