define(function(require, exports, module) {
    var $ = require("$");
    var alertError = require("./alertError");
    var ConfirmBox = require("ConfirmBox");

    module.exports = {
        init: function() {
            var self = this;
            
        },
        _ajax: function(url, param, type, async) {
            return $.ajax({
                url: url,
                data: param || {},
                type: type || 'POST',
                async: async || true
            });
        },
        _handleAjax: function(url, param, type, async) {
            var self = this;
            return self._ajax(url, param, type, async).then(function(res) {
                // 成功回调
                if (res.successed) {
                    return res.returnValue; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
                } else {
                    return $.Deferred().reject(res.errorCode); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
                }
            }, function(err) {
                // 失败回调
                alertError("网络异常，请稍后重试！")
            });
        },
        _handleAjaxLive: function(url, param, type, async) {
            var self = this;
            return self._ajax(url, param, type, async).then(function(res) {
                // 成功回调
                if (res.isSuccessed) {
                    return res.returnValue; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
                } else {
                    return $.Deferred().reject(res.errorCode); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
                }
            }, function(err) {
                // 失败回调
                alertError("网络异常，请稍后重试！")
            });
        },
        _giveConfirm: function(title,width) {
            var title = title || "操作成功！";
            var width = width || 170;
            ConfirmBox.iconView('', function() {
                // window.location.href = "/loginOut.html"; 
            }, {
                iconType: 'success',
                msgTile: title,
                simple: true, // flag of reset style; Should be boolean.
                timeout: 1000,
                width: width,
                confirmTpl: '',
                cancelTpl: '',
                closeTpl: ''
            });
        },
        _giveConfirmBox: function(title,callback,cancleback,title1){
            var title1 = title1 || '商品状态设置'
            ConfirmBox.confirm(title, title1 , function(e) {
                // e.preventDefault();
                callback()
            }, function() {
               cancleback()
            },
            {
                confirmTpl: '<a class="btn btn-success" href="javascript:;" style="padding: 5px 10px;">确&nbsp;&nbsp;定</a>',
                cancelTpl: '<a class="btn btn-default" href="javascript:;">取&nbsp;&nbsp;消</a>',
                width: 300,
                closeTpl: ''
            });
        },
        _encodeSMS: function(num) {
            var publicKeyExponent = $(":input[name=exponent]").val();
            var publicKeyModulus = $(":input[name=modulus]").val();
            RSAUtils.setMaxDigits(200);
            var key = new RSAUtils.getKeyPair(publicKeyExponent,
                "", publicKeyModulus);

            var msg_validate_code = num;
            var reversedMsgValidateCode = msg_validate_code.split("").reverse().join("");
            return RSAUtils.encryptedString(key, reversedMsgValidateCode);
        },
        _getCurrentDate: function() {
            var date = new Date();
            var seperator1 = "-";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        _caleData: function(date, days) {
            var self = this;
            var val = "";
            var d = new Date(date);
            d.setDate(d.getDate() + days);
            var month = d.getMonth() + 1;
            var day = d.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            var currentData = self._getCurrentDate();
            var e = new Date(currentData);
            if(d.getTime() > e.getTime()) {
                val = currentData
            }else{
                val = d.getFullYear() + "-" + month + "-" + day;
            }
            return val;
        },
        _initHeight: function() {
            var iWindowHeight = $(window).height();
            var iMainHeight = $(".main").height();

            var iTopDis = $(".main").offset().top;
            if (iMainHeight < iWindowHeight) {
                $(".main").css("height", iWindowHeight - iTopDis - 10);
            };

            $(window).scroll(function() {
                var iWindowHeight = $(window).height();
                var iTopDis = $(".main").offset().top;
                if (iMainHeight < iWindowHeight) {
                    $(".main").css("height", iWindowHeight - iTopDis - 10);
                }
            });
            $(window).resize(function() {
                var iWindowHeight = $(window).height();
                var iTopDis = $(".main").offset().top;
                if (iMainHeight < iWindowHeight) {
                    $(".main").css("height", iWindowHeight - iTopDis - 10);
                }
            });
        }
    }

});