/*  获取URL参数 */
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var Request = new Object();
Request = GetRequest();
var tabIndex = Request['tabIndex'];

if(tabIndex){
    tabIndex = parseFloat(tabIndex);
    /* Tab 切换 */
    $('.tabHeader button').each(function (i) {
        $('.tabHeader button').removeClass('check').eq(tabIndex).addClass('check');
        $('.tabContainer .tabItem').removeClass('check').hide().eq(tabIndex).addClass('check').show()
    });
}


var WW = $(window).outerWidth();
$.fn.extend({
    imgSetSize: function (domW,domH) {
        var imgW = $(this).width();
        var imgH = $(this).height();
        var imgS = imgW / imgH;
        var domS = domW / domH;
        var state = imgS - domS;
        var notSetSize = $(this).attr('notSize');
        // console.log(state)
        if(!notSetSize){
            if(state < 0){
                $(this).css({
                    width: '100%',
                    marginTop: -(imgH * domW / imgW - domH) / 2
                })
            }else {
                $(this).css({
                    height: '100%',
                    marginLeft: -(imgW * domH / imgH - domW) / 2
                })
            }
        }
    },
    setSize: function (w,h) {
        var domW  = $(this).outerWidth();
        var domH = domW * h / w;
        $(this).height(domH);
        console.log(w,h);
        $(this).find('img').each(function () {
            $(this).imgSetSize(domW,domH);
        })

    }
});

setInterval(function () {
    var winScrollTop = $(window).scrollTop();
    //console.log(winScrollTop - (WW * 600 / 1920));
    if(winScrollTop > WW * 600 / 1920){
        $('.header').css('box-shadow','0 1px 15px #ccc')
    }else {
        $('.header').css('box-shadow','none')
    }
},17);


