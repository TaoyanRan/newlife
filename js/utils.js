// tab切换
function changeTab(tabParentDom) {
    // console.log('changeTab(' +tabParentDom +')');
    $(tabParentDom + ' .tabHeader .tabItem').each(function (i) {
        // console.log('item ',i);
        $(this).click(function () {
            $(tabParentDom + ' .tabHeader .tabItem').removeClass('active').eq(i).addClass('active');
            $(tabParentDom + ' .tabContainer .tabItem').removeClass('active').eq(i).addClass('active')
        })
    })
};

// 新闻列表 单轴两列
function axisColumn_2() {
    var newsList = [];

    function createNewsList() {
        var maxLength = $('.axisColumn-2 li').length;
        var forLength = Math.floor((maxLength + 1) / 2);
        for(var i=0;i<forLength;i++){
            newsList.push(i);
            var j = forLength + i;
            if(j < maxLength){
                newsList.push(j)
            }
        }
    }
    createNewsList();

    var changeNresData = {
        start : 0,
        newsLength: newsList.length,
        time: 3000
    };

    var CHANGENEWS = setInterval(changeNews,changeNresData.time);

    function changeNews() {
        changeNresData.start ++;
        changeNresData.start  = changeNresData.start >= changeNresData.newsLength ? 0 : changeNresData.start;
        var newsI = newsList[changeNresData.start];
        $('.axisColumn-2 li').removeClass('active').eq(newsI).addClass('active');
    }

    $('.axisColumn-2 li').each(function (i) {
        $(this).hover(function () {
            $('.axisColumn-2 li').removeClass('active').eq(i).addClass('active');
            changeNresData.start = i;
        })
    });

    $('.axisColumn-2').on("mouseenter", function(){
        clearInterval(CHANGENEWS);
    });
    $('.axisColumn-2').on("mouseleave", function(){
        CHANGENEWS = setInterval(changeNews,changeNresData.time);
    });
};

$.fn.extend({
    swipe: function (params) {
        var _this = $(this);
        // console.log('hello swipe');
        // console.log(params.autoPlay);
        params = params ? params : {};
        if(params.autoPlay == true || params.autoPlay == undefined){
            params.autoPlay = 3000
        }
        if(params.navigation || params.navigation == undefined){
            params.navigation = true
        }
        if(params.pagination || params.pagination == undefined){
            params.pagination = true
        }

        var init = {
            autoPlay: params.autoPlay ? params.autoPlay : false,
            navigation: params.navigation ? params.navigation : false, // 左右切换
            pagination: params.pagination ? params.pagination : false, // 圆点切换
            slideLength: _this.find('.slide').length
        };
        // console.log('init >>>>>',init);
        // 默认index
        _this.find('.swipeContainer').attr('index',0);
        // 创建左右箭头
        if(init.pagination){
            _this.find('.pagination').append('<span class="prev"></span><span class="next"></span>')
        }
        // 创建圆点
        if(init.navigation){
            for(var i=0;i<init.slideLength;i++){
                var active = i== 0 ? 'active' : '';
                _this.find('.navigation').append('<span class="' + active + '"></span>');
            }
        }

        var autoPlay;

        if(init.autoPlay){
            autoPlay = setInterval(function () {
                swipeChange(1)
            },init.autoPlay)
        }

        function swipeChange(number) {
            // console.log('change swipe');
            number = number ? number : 1;
            var index = _this.find('.swipeContainer').attr('index');
            var sliders = init.slideLength;
            index = parseFloat(index);
            // console.log(index,sliders);
            index += number;
            if(index >= sliders){ index = 0 }else if(index < 0){ index = sliders - 1 }
            _this.find('.swipeContainer').attr('index',index);
            _this.find('.navigation span').removeClass('active').eq(index).addClass('active');
            _this.find('.slide').removeClass('active').eq(index).addClass('active');
        }


        _this.find('.prev').click(function () {
            // console.log('prev');
            swipeChange(-1)
        });
        _this.find('.next').click(function () {
            // console.log('next');
            swipeChange(1)
        });
        _this.hover(function () {
            if(init.autoPlay){
                clearInterval(autoPlay)
            }
        },function () {
            if(init.autoPlay){
                autoPlay = setInterval(function () {
                    swipeChange(1)
                },init.autoPlay)
            }
        });

        _this.find('.navigation span').each(function (i) {
            $(this).click(function () {
                _this.find('.navigation span').removeClass('active').eq(i).addClass('active');
                _this.find('.slide').removeClass('active').eq(i).addClass('active');
                _this.find('.swipeContainer').attr('index',i);
            })
        });
    },
    setSize: function (w,h) {
        var domW  = $(this).outerWidth();
        var domH = domW * h / w;
        $(this).height(domH);
        // console.log(domW,domH);
        console.log('>>>>>>>>',$(this).selector,w,h,domW,domH);
    },
    mySlider: function () {
        var selector = $(this).selector;

        var sliderContainer = $(selector + ' .sliderContainer');
        var sliderWrapper   = $(selector + ' .sliderWrapper');
        var sliderItem      = $(selector + ' .sliderItem');
        var prev            = $(selector + ' .prev');
        var next            = $(selector + ' .next');

        var minScroll = sliderContainer.width();
        var appendSliderItem  = sliderItem.eq(0).prop("outerHTML");
        var prependSliderItem = sliderItem.eq(sliderItem.length - 1).prop("outerHTML");

        sliderWrapper.append(appendSliderItem);
        sliderWrapper.prepend(prependSliderItem);
        sliderItem.each(function () {
            $(this).width($(this).parent().parent().width())
        });


        sliderWrapper.width(sliderWrapper.parent().width() * sliderWrapper.children().length);

        sliderContainer.scrollLeft(minScroll);
        var maxScroll = sliderWrapper.parent().width() * (sliderWrapper.children().length - 1);

        next.click(function () {
            if($(this).attr('disabled')){
                return false
            }
            changeSlider(1)
        });

        prev.click(function () {
            if($(this).attr('disabled')){
                return false
            }
            changeSlider(-1)
        });


        function changeSlider(direction) {
            prev.attr('disabled','disabled');
            next.attr('disabled','disabled');

            var nowScroll = sliderContainer.scrollLeft();
            var endScroll = nowScroll + minScroll * direction;

            sliderContainer.animate({
                'scrollLeft': endScroll
            },function () {
                if(endScroll <= 0){
                    sliderContainer.scrollLeft(maxScroll - minScroll);
                }else if(endScroll >= maxScroll){
                    sliderContainer.scrollLeft(minScroll);
                }
                prev.removeAttr('disabled');
                next.removeAttr('disabled');
            });

        }
    }
});

// banner
$('.banner').setSize(1920,635);
if($('#banner')){
    $('#banner').swipe();
}

