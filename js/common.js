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

    if(winScrollTop > 0){
        $('.header').addClass('dropHeader')
    }else {
        $('.header').removeClass('dropHeader')
    }

},17);

// 导航header 悬浮效果
$('.headerLink').each(function () {
    $(this).hover(function () {
        var dropdown = $(this).find('.dropdown');

        dropdown.stop(true,true).slideDown()

    },function () {
        var dropdown = $(this).find('.dropdown');

        dropdown.stop(true,true).slideUp()
    })
});


//---------主角：轮播图函数-------------
function slideshow(dom,between) {
    var slideshow = $(dom),
        sliders = $(dom + " .sliderBlock"), //得到slider们
        pagination = $(dom + " .pagination"),
        //descrips = $(dom + " p"), //得到描述们
        current = 0, //current为当前活跃的图片编号
        prev = $(dom + " .prev"), // 上一个按钮
        next = $(dom + " .next"); // 下一个按钮
    pagination.html('');
    sliders.each(function (i) { // 生成页码
        var activeClass = i == 0 ? 'active' : '';
        pagination.append('<span class="' + activeClass + '">' + (i + 1) + '</span>')
    });

    var pages = $(dom + " .pagination span"); //得到页码们

    function slideOff() {
        sliders.eq(current).removeClass('active'); //图片淡出
        pages[current].className="";
        //descrips[current].className="";
    }
    function slideOn() {
        sliders.eq(current).addClass('active'); //图片淡入
        pages[current].className="active";
        //descrips[current].className="active";
    }

    function changeSlide() { //切换图片的函数
        slideOff();
        current++; //自增1
        if(current>=3) current=0;
        slideOn();
    }
    prev.click(function () { // 上一个slider
        slideOff();
        current--;
        if(current < 0) current = 2;
        slideOn()
    });
    next.click(function () { // 下一个slider
        slideOff();
        current++; //自增1
        if(current>=3) current=0;
        slideOn()
    });


    //每几s调用changeSlide函数进行图片轮播
    var slideon=setInterval(changeSlide,between ? between : 10000000);

    slideshow.mouseover(function () {
        clearInterval(slideon); //当鼠标移入时清除轮播事件
    });
    slideshow.mouseout(function () {
        slideon=setInterval(changeSlide,between ? between : 3000); //当鼠标移出时重新开始轮播事件
    });

    for(var i=0; i<pages.length; i++) { //定义鼠标移入和移出页码事件
        pages[i].onclick=function(){
            slideOff(); //图片淡出
            current=this.innerHTML-1; //得到鼠标停留的页码对应的current
            slideOn(); //图片淡出
        }
    }


}

