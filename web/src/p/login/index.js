// define(function(require, exports, module) {
// 	var $ = require("$");
// 	var alertError = require("../../c/alertError");

	$('html').on('keydown', function(e) {
		if(e.keyCode == 13) {
			login();
		}
	});

	$(".login").on("click", function() {
		login();
	});

	function login() {
		var username = $(':input[name=username]').val();
		var password = $(':input[name=password]').val();
		var validateCode = $(':input[name=validate-code]').val();
		var encrypedPwd = md5(password);
		console.log(username, password, validateCode);

		if(username.length === 0) {

			$("#J_tipError").html("亲，登录名不能为空哦");
			$(":input[name=username]").focus();

		} else if(password.length === 0) {

			$("#J_tipError").html("亲，密码不能为空哦");
			$(":input[name=password]").focus();

		} else if(validateCode.length === 0) {

			$("#J_tipError").html("亲，验证码不能为空哦");
			$(":input[name=validate-code]").focus();

		} else {
			$("#J_tipError").html("");
			$.ajax({
				cache: true,
				type: "POST",
				url: "/login/loginApi.json",
				data: {
					password: encrypedPwd,
					username: username,
					img_validate_code: md5(validateCode.toLowerCase().replace(/(^\s+)|(\s+$)/g, ""))
				},
				async: true,
				success: function(data) {
					//存储用户信息
					setCookie('username', username);
					if(data.successed) {
						// alert("登录成功！");
						window.location.href = "/manage/index.html"
					} else {
						// alertError(data.errorCode);
						if(data.errorCode == 'LM0020') {
							window.location.href = "./checking.html"
						} else if(data.errorCode == 'LM0019') {
							setCookie('errorDesc', data.errorDesc);
							window.location.href = "./uncheck.html"
						} else {
							$("#J_tipError").html(data.errorCode);
						};

					}

				},
				error: function() {
					alertError("网络异常，请稍后重试");
				}
			});
		}
	};
	//设置cookie
	function setCookie(name, value) {
		var self = this;
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	};
	// module.exports = {
	//     init: function() {
	//         var self = this;
	//         self._validate();
	//     },
	//     _validate: function() {
	//         var self = this;
	//         var validator = new Validator({
	//             element: '#J_login',
	//             itemClass: ".border",

	//             stopOnError: true,
	//             failSilently: true,
	//             onFormValidated: function(err, results, form) {
	//                 // $("#J_tipError").html(results);
	//             }
	//         });
	//         validator.addItem({
	//                 element: ':input[name=username]',
	//                 required: true,
	//                 errormessageRequired: '亲，登录名不能为空哦',
	//                 showMessage: function(message, element) {
	//                     $("#J_tipError").html(message);
	//                 }
	//             })
	//             .addItem({
	//                 element: ':input[name=password]',
	//                 required: true,
	//                 errormessageRequired: '亲，密码不能为空哦',
	//                 showMessage: function(message, element) {
	//                     $("#J_tipError").html(message);
	//                 }
	//             })
	//             .addItem({
	//                 element: ':input[name=validate-code]',
	//                 required: true,
	//                 errormessageRequired: '亲，验证码不能为空哦',
	//                 showMessage: function(message, element) {
	//                     $("#J_tipError").html(message);
	//                 }
	//             });

	//         $("#J_login").on("click", ":input[name=login]", function(e) {
	//             validator.execute(function(element, error, message) {
	//                 if (!element) {
	//                     self._login();
	//                 }
	//             });
	//         })

	//         $(':input[name=validate-code]').unbind('keyup').bind('keyup', function(eve) {
	//             var eve = window.event || eve;
	//             if (eve.keyCode == 13) {
	//                 validator.execute(function(element, error, message) {
	//                     if (!element) {
	//                         self._login();
	//                     }
	//                 });
	//             }
	//         });
	//     },
	//     _login: function() {
	//         var self = this;
	//         var password = $(':input[name=password]').val();
	//         var username = $(':input[name=username]').val();
	//         var validateCode = $(':input[name=validate-code]').val();
	//         var encrypedPwd = md5(password);
	//         $.ajax({
	//             cache: true,
	//             type: "POST",
	//             url: "/login/loginApi.json",
	//             data: {
	//                 password: encrypedPwd,
	//                 username: username,
	//                 img_validate_code: md5(validateCode.toLowerCase().replace(/(^\s+)|(\s+$)/g, ""))
	//             },
	//             async: true,
	//             success: function(data) {
	//                 if (data.successed) {
	//                     // alert("登录成功！");
	//                     window.location.href = "/manage/index.html"
	//                 } else {
	//                     // alertError(data.errorCode);
	//                     $("#J_tipError").html(data.errorCode);
	//                 }

	//             },
	//             error: function() {
	//                 alertError("网络异常，请稍后重试");
	//             }
	//         });
	//     }
	// }
	// module.exports.init();
//});