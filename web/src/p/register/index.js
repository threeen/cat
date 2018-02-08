// define(function(require, exports, module) {
// 	var $ = require("$");
// 	var Validator = require("validator");
// 	var ConfirmBox = require("ConfirmBox");
// 	var Dialog = require("dialog");
// 	var alertError = require("../../c/alertError");
// 	var agreementTpl = require("./agreement.handlebars");
 	var picUrl = ''; //上传图片

	//获取验证码
	$(":input[name=send-code]").on("click", function() {
		var qmobile = $(':input[name=mobile]').val();
		var code = $(':input[name=validate-code-img]').val();
		if(qmobile.length === 0) {

			$("#J_tipError").html("亲，手机号不能为空哦");
			$(":input[name=mobile]").focus();

		} else if(!(/^1[3|4|5|7|8]\d{9}$/.test(qmobile))) {

			$("#J_tipError").html("亲，手机号码不合法哦");
			$(":input[name=mobile]").focus();

		} else if(code.length === 0) {

			$("#J_tipError").html("亲，验证码不能为空哦");
			$(":input[name=validate-code-img]").focus();

		} else {
			$("#J_tipError").html("");
			$(".register1").hide();
			$("#register").show();
			getMobileCode();
		}
	})

	function getMobileCode() {
		var self = this;
		var url = '/common/sendMsgValidateCodeApi.json';
		var data = {
			"businessType": 'register',
			"mobile": $(":input[name=mobile]").val(),
			"img_validate_code": md5($(':input[name=validate-code-img]').val().toLowerCase().replace(/(^\s+)|(\s+$)/g, ""))
		};

		$.ajax({
			url: url,
			data: data,
			type: "POST",
			cache: false,
			success: function(res) {
				if(res.successed) {
					giveConfirm("验证码发送成功！")
					$(":input[name=mobile]").attr("disabled", true);
					$(":button[name=send-code]").addClass('disable');

					var count = 120;
					self.countdown = setInterval(CountDown, 1000);

					function CountDown() {
						$(":button[name=send-code]").attr("disabled", true);
						$(":button[name=send-code]").text("重新发送（" + count + " ）");
						if(count == 0) {
							$(":button[name=send-code]").text("获取验证码").removeAttr("disabled");
							$(":button[name=send-code]").removeClass('disable');
							clearInterval(self.countdown);
						}
						count--;
					}
				} else {
					$("#J_tipError").html(res.errorCode);
					clearInterval(self.countdown);
				}
			},
			error: function() {
				alertError("请求超时,请稍后重试");
			}
		});
	};

	function giveConfirm(title) {
		ConfirmBox.iconView('', function() {

		}, {
			iconType: 'success',
			msgTile: title,
			simple: true, // flag of reset style; Should be boolean.
			timeout: 2000,
			width: 250,
			confirmTpl: '',
			cancelTpl: '',
			closeTpl: '×'
		});
	};
	//查看图片
	$(document).on("click", ".buttonGroup1 span", function(e) {
		window.open(picUrl);
	});
	//上传图片
	$(document).on("change", ".input-file", function(e) {
		var $this = $(this);
		var file = $(this)[0].files[0];

		$this.parent().prev().show();
		$this.prev().find('span').html('更改');
		var url = "/common/upload.json";
		var formData = new FormData();
		formData.append('file', $(this)[0].files[0], $(this)[0].name);
		$.ajax({
			url: url,
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			// xhr: xhrOnProgress,
			beforeSend: function(res) {
				$(this).prev().hide();
			},
			success: function(res) {
				console.log(res)
				if(res.successed) {
					if(res.returnValue[0] + '' != 'undefined') {
						picUrl = res.returnValue[0];
					};
					$('.companyimg').val(file.name);

				} else {
					alertError("上传失败,稍后重试");
					$this.parent().prev().hide();
					$this.prev().find('span').html('上传');
				}

			},
			error: function(res) {
				alertError("上传失败,请重新上传！");
				$this.parent().prev().hide();
				$this.prev().find('span').html('上传');
			}
		});
	});
	//注册
	$(".register").on("click", function() {
		var paramsData = {
			email: $(":input[name=email]").val(),
			password: $(':input[name=password]').val(),
			company: $(":input[name=company]").val(),
			appName: $(":input[name=appname]").val(),
			linkman: $(":input[name=fullname]").val(),
			mobile: $(':input[name=mobile]').val(),
			licenseNo: $(':input[name=companycount]').val(),
			licensePic:picUrl ,
			msg_validate_code: $(':input[name=validate-code]').val(),
			agree: $(':input[name=isagree]').is(':checked')
		};

		if(paramsData.email.length === 0) {

			$("#J_tipError").html("亲，邮箱不能为空哦");
			$(":input[name=email]").focus();

		} else if(IsEmail(paramsData.email) === 1) {

			$("#J_tipError").html("亲，邮箱格式不正确哦");
			$(":input[name=email]").focus();

		} else if(paramsData.password.length === 0) {

			$("#J_tipError").html("亲，密码不能为空哦");
			$(":input[name=password]").focus();

		} else if(paramsData.password.length < 6) {

			$("#J_tipError").html("亲，密码不能少于6位哦");
			$(":input[name=password]").focus();

		} else if(paramsData.password.length > 16) {

			$("#J_tipError").html("亲，密码不能多于16位哦");
			$(":input[name=password]").focus();

		} else if(paramsData.company.length === 0) {

			$("#J_tipError").html("亲，公司名不能为空哦");
			$(":input[name=company]").focus();

		} else if(paramsData.licenseNo.length === 0) {
			$("#J_tipError").html("亲，公司执照号不能为空哦");
			$(":input[name=companycount]").focus();
		} else if(paramsData.licensePic.length === 0) {
			$("#J_tipError").html("亲，公司执照图片不能为空哦");
		} else if(paramsData.appName.length === 0) {

			$("#J_tipError").html("亲，应用名称不能为空哦");
			$(":input[name=appname]").focus();

		} else if(paramsData.linkman.length === 0) {

			$("#J_tipError").html("亲，真实姓名不能为空哦");
			$(":input[name=fullname]").focus();

		} else if(paramsData.mobile.length === 0) {

			$("#J_tipError").html("亲，手机号码不能为空哦");
			$(':input[name=mobile]').focus();

		} else if(!(/^1[3|4|5|7|8]\d{9}$/.test(paramsData.mobile))) {

			$("#J_tipError").html("亲，请填写正确格式手机号码");
			$(':input[name=mobile]').focus();

		} else if(paramsData.msg_validate_code.length === 0) {

			$("#J_tipError").html("亲，短信验证码不能为空哦");
			$(':input[name=validate-code]').focus();

		} else if(paramsData.agree === false) {

			$("#J_tipError").html("亲，请同意变现猫服务使用协议");

		} else {
			$("#J_tipError").html("");
			register();
		}

	});

	function register() {
		var password = $(':input[name=password]').val();
		//加密密码
		var encrypedPwd = md5(password);
		//加密验证码
		var msg_validate_code = $(':input[name=validate-code]').val();
		var encrypedMsgValidateCode = md5(msg_validate_code.toLowerCase().replace(/(^\s+)|(\s+$)/g, ""));

		$.ajax({
			cache: true,
			type: "POST",
			url: "/register/registerApi.json",
			data: {
				email: $(":input[name=email]").val(),
				password: encrypedPwd,
				company: $(":input[name=company]").val(),
				appName: $(":input[name=appname]").val(),
				linkman: $(":input[name=fullname]").val(),
				mobile: $(':input[name=mobile]').val(),
				licenseNo: $(':input[name=companycount]').val(),
				licensePic: picUrl,
				msg_validate_code: encrypedMsgValidateCode
			},
			async: true,
			success: function(data) {
				if(data.successed) {
					window.location.href = "/register/success.html?email=" + $(":input[name=email]").val();
				} else {
					$("#J_tipError").html(data.errorCode);
				}

			},
			//异常
			error: function() {
				alert("网络异常，请稍后重试");
			}
		});
	};

	function IsEmail(str) {
		if(str.length != 0) {
			reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if(!reg.test(str)) {
				return 1;
			}
		};
	};
	//登录失败 是注册信息
	var Uncheckusername = UncheckRegister();
	if(Uncheckusername) {
		$.ajax({
			cache: true,
			type: "POST",
			url: "/register/echo.json",
			data: {
				username: getCookie('username'),
			},
			async: true,
			success: function(data) {
				if(data.returnValue) {
					$(":input[name=email]").val(data.returnValue.email);
					$(":input[name=company]").val(data.returnValue.company);
					$(":input[name=appname]").val(data.returnValue.appName);
					$(":input[name=fullname]").val(data.returnValue.linkman);
					$(':input[name=mobile]').val(data.returnValue.mobile);
					$(':input[name=companycount]').val(data.returnValue.licenseNo);
					$(':input[name=companyimg]').val(data.returnValue.licensePic);
				};
			},
			//异常
			error: function() {
				alert("网络异常，请稍后重试");
			}
		});
	};
	//存取chanel
	var chanel = _getQueryString('chanel');
	if(chanel) {
		setCookie('chanel', chanel);
	};
	//存取cookie
	function setCookie(name, value) {
		var self = this;
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	};
	//读取cookie
	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	};
	/*****获取URL参数****/
	function _getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		}
		return null;
	};

	function UncheckRegister() {
		var referrerUrl = document.referrer;
		return referrerUrl.substr(0, referrerUrl.length).indexOf('uncheck') > -1;
	};
	// module.exports = {
	//     init: function() {
	//         var self = this;
	//         self._validate();
	//     },
	//     _validate: function() {
	//         var self = this;
	//         var validator = new Validator({
	//             element: '#J_register',
	//             itemClass: "border",
	//             itemHoverClass: "form-group-hover",
	//             itemFocusClass: "form-group-focus",
	//             itemErrorClass: "form-group-error",
	//             inputClass: "form-control",
	//             stopOnError: true,
	//             failSilently: true,
	//             onFormValidated: function(err, results, form) {
	//                 // $("#J_tipError").html(results);
	//             }
	//         });
	//         validator.addItem({
	//                 element: ':input[name=email]',
	//                 required: true,
	//                 rule: 'email',
	//                 errormessageRequired: '亲，邮箱不能为空哦',
	//                 errormessageEmail: '亲，邮箱格式不正确哦',
	//                 showMessage: function(message, element) {
	//                     $("#J_tipError").html(message);
	//                 }
	//             })
	//             .addItem({
	//                 element: ':input[name=password]',
	//                 required: true,
	//                 rule: 'minlength{"min":6} maxlength{"max":16}',
	//                 errormessageRequired: '亲，密码不能为空哦',
	//                 errormessageMinlength: '亲，密码不能少于6位哦',
	//                 errormessageMaxlength: '亲，密码不能多于16位哦',
	//                 showMessage: function(message, element) {
	//                     $("#J_tipError").html(message);
	//                 }
	//             })
	//             .addItem({
	//                 element: ':input[name=company]',
	//                 required: true,
	//                 errormessageRequired: '亲，公司名称不能为空哦',
	//                 showMessage: function(message, element) {
	//                     $("#J_tipError").html(message);
	//                 }
	//             })
	//             .addItem({
	//                 element: ':input[name=appname]',
	//                 required: true,
	//                 errormessageRequired: '亲，应用名称不能为空哦',
	//                 showMessage: function(message, element) {
	//                     $("#J_tipError").html(message);
	//                 }
	//             })
	//             .addItem({
	//                 element: ':input[name=fullname]',
	//                 required: true,
	//                 errormessageRequired: '亲，真实姓名不能为空哦',
	//                 showMessage: function(message, element) {
	//                     $("#J_tipError").html(message);
	//                 }
	//             })
	//         validator.addItem({
	//                 element: ':input[name=mobile]',
	//                 required: true,
	//                 rule: "mobile",
	//                 errormessageRequired: '亲，手机不能为空哦',
	//                 errormessageMobile: '亲，手机号码不合法哦',
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

	//         $("#J_register").on("click", ".register", function(e) {
	//             validator.execute(function(element, error, message) {
	//                 if (!element) {
	//                     self._register();
	//                 }
	//             });

	//         });
	//         $("#agreememt").on("click", function(e) {
	//             self._getAgreementDialog();
	//         });
	//     },
	//     _getAgreementDialog: function(param) {

	//         var self = this;
	//         var param = param || "";
	//         $(".alinw-dialog-2_0_6").remove();
	//         var detailDialog = new Dialog({
	//             title: "abc",
	//             width: 700,
	//             content: agreementTpl(),

	//             closeTpl: '×'
	//         });
	//         detailDialog.show();

	//     },

	//     _register: function() {
	//         var self = this;

	//         var password = $(':input[name=password]').val();
	//         //加密密码
	//         var encrypedPwd = md5(password);
	//         //加密验证码
	//         var msg_validate_code = $(':input[name=validate-code]').val();
	//         var encrypedMsgValidateCode = md5(msg_validate_code.toLowerCase().replace(/(^\s+)|(\s+$)/g, ""));

	//         $.ajax({
	//             cache: true,
	//             type: "POST",
	//             url: "/register/registerApi.json",
	//             data: {
	//                 email: $(":input[name=email]").val(),
	//                 password: encrypedPwd,
	//                 company: $(":input[name=company]").val(),
	//                 appName: $(":input[name=appname]").val(),
	//                 linkman: $(":input[name=fullname]").val(),
	//                 mobile: $(':input[name=mobile]').val(),
	//                 msg_validate_code: encrypedMsgValidateCode
	//             },
	//             async: true,
	//             success: function(data) {
	//                 if (data.successed) {
	//                     window.location.href = "/register/success.html?email=" + $(":input[name=email]").val();
	//                 } else {
	//                     $("#J_tipError").html(data.errorCode);
	//                 }

	//             },
	//             //异常
	//             error: function() {
	//                 alert("网络异常，请稍后重试");
	//             }
	//         });
	//     },
	//     _getMobileCode: function() {
	//         var self = this;
	//         var url = '/common/sendMsgValidateCodeApi.json';
	//         var data = {
	//             "businessType": 'register',
	//             "mobile": $(":input[name=mobile]").val(),
	//             "img_validate_code": md5($(':input[name=validate-code-img]').val().toLowerCase().replace(/(^\s+)|(\s+$)/g, ""))
	//         };

	//         $.ajax({
	//             url: url,
	//             data: data,
	//             type: "POST",
	//             cache: false,
	//             success: function(res) {
	//                 if (res.successed) {
	//                     self._giveConfirm("验证码发送成功！")
	//                     $(":input[name=mobile]").attr("disabled", true);
	//                     $(":input[name=register]").attr("disabled", false);
	//                     $(":input[name=register]").removeClass('disable');
	//                     $(":input[name=send-code]").addClass('disable');

	//                     var count = 60;
	//                     self.countdown = setInterval(CountDown, 1000);

	//                     function CountDown() {
	//                         $(":input[name=send-code]").attr("disabled", true);
	//                         $(":input[name=send-code]").text("倒计时" + count + " 秒");
	//                         if (count == 0) {
	//                             $(":input[name=send-code]").text("获取验证码").removeAttr("disabled");
	//                             $(":input[name=send-code]").removeClass('disable');
	//                             clearInterval(self.countdown);
	//                         }
	//                         count--;
	//                     }
	//                 } else {
	//                     // $("#J_tipError").html(
	//                     // $("#J_tipError").parent(".form-group").addClass('form-group-error');
	//                     $("#J_tipError").html(res.errorCode);
	//                     clearInterval(self.countdown);
	//                 }
	//             },
	//             error: function() {
	//                 alertError("请求超时,请稍后重试");
	//             }
	//         });
	//     },
	//     _giveConfirm: function(title) {
	//         ConfirmBox.iconView('', function() {

	//         }, {
	//             iconType: 'success',
	//             msgTile: title,
	//             simple: true, // flag of reset style; Should be boolean.
	//             timeout: 2000,
	//             width: 250,
	//             confirmTpl: '',
	//             cancelTpl: '',
	//             closeTpl: '×'
	//         });
	//     }
	// }
	// module.exports.init();
//});