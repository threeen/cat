define(function(require, exports, module) {
    var $ = require("$");
    module.exports = {
        init: function() {
            var self = this;

            $(window).resize(function() {
                self._initSlider();
            })

            if($("#home").length > 0) {
                self._initSlider();
            }
            if($("#live").length >0) {
                self._initSlider("liveNavP");
            }
            if($("#buy").length >0) {
                self._initSlider("buyNavP");
            }
            if($("#ad").length >0) {
                self._initSlider("adNavP");
            }
            if($("#book").length >0) {
                self._initSlider("bookNavP");
            }
            if($("#mm").length >0) {
                self._initSlider("mmNavP");
            }
            if($("#showcase").length >0) {
                self._initSlider("showcaseNavP");
            }
            if($("#money").length >0) {
                self._initSlider("loanNavP");
            }
            if($("#joke").length >0) {
                self._initSlider("jokeNavP");
            }
            if($("#wawaji").length >0) {
                self._initSlider("wawajiNavP");
            }
            if($("#account").length > 0) {
                self._initSlider()
            }
            if($("#setting").length > 0) {
                self._initSlider()
            }
        },
        _initSlider: function(tag) {
            var self = this;
            var fixHeight = 164; // 此高度包括logo的高度74 和底部导航高度90            
            var menuHeight = 68; // menu 单个高度    
            var sliderHeight = $(window).height() - fixHeight; // menu box高度            
            var $silderMenu = $("#J_sliderBox").find(".slider-content");
            var menusHeight = $silderMenu.height(); // menu 总高度
            $("#J_sliderBox").css("height", sliderHeight);

            var tempScrollTop = self._getCookie(tag) || 0;

            if (sliderHeight > menusHeight) {
                $(".up,.down").hide(.5);
            } else {
                $(".up,.down").show(.5);
                $(".slider-content").css("top", -tempScrollTop);
            }

            $("#J_sliderBox").off("click", ".down").on("click", ".down", function(res) {
                var upIndex = Math.ceil((menusHeight - sliderHeight - tempScrollTop) / menuHeight);

                if (upIndex > 0) {
                    tempScrollTop = parseInt(tempScrollTop) + parseInt(menuHeight);
                    $silderMenu.stop().animate({
                        "top": -tempScrollTop
                    });

                }
            })

            $("#J_sliderBox").on("click", ".up", function(res) {

                var downIndex = Math.ceil(tempScrollTop / menuHeight);

                if (downIndex > 0) {
                    tempScrollTop -= menuHeight;
                    $silderMenu.stop().animate({
                        "top": -tempScrollTop
                    });
                }
            })

            $(".slider-content").on("click", "a", function(e) {
                var navId = $(this).data("menu");
                self._setCookie(navId, tempScrollTop);
            })
        },
        _setCookie: function(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + "; path=/; expires=" + exp.toGMTString();
        },
        _getCookie: function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        }

    }
    module.exports.init();
});