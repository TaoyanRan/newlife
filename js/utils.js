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
            // params.autoPlay = 3000
            params.autoPlay = 5000
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
    },

    viewPager: function (item) {
        var width = 100 / item;
        var next = $('.dyServiceSwipe .next');
        var prev = $('.dyServiceSwipe .prev');
        var wrapper = $('.dyServiceList');
        var ul = $('.dyServiceSwipe ul');
        var li = $('.dyServiceSwipe li');

        li.css('width',width + '%');
        for(var ali = 0;ali<item-1;ali++){
            ul.append(li.eq(ali).prop("outerHTML"));
            ul.prepend(li.eq(li.length - ali - 1).prop("outerHTML"));
        }



        var length = $('.dyServiceSwipe ul li').length;
        var distance = $('.dyServiceSwipe').width() * width / 100;
        var i = item - 1;
        ul.css('left',-distance * i + 'px');

        function nextItem() {
            i++;
            ul.stop(true).animate({
                'left': -distance * i + 'px'
            },function () {
                if(i >= length - item){
                    i = item - 2;
                    ul.css('left',-distance * i + 'px');
                }
            });
        }

        function prevItem() {
            i--;
            ul.stop(true).animate({
                'left': -distance * i + 'px'
            },function () {
                if(i < 0){
                    i = length - item - (item - 1);
                    ul.css('left',-distance * i + 'px');
                }
            });
        }

        next.click(function () {
            nextItem()
        });

        prev.click(function () {
            prevItem()
        });

        var t = setInterval(nextItem,3000);
        ul.hover(function () {
            clearInterval(t)
        },function () {
            t = setInterval(nextItem,3000)
        })
    },

    // 图片预览
    preView: function (imgList) {

        var imgList = [];

        $(this).find('img').each(function () {
            if($(this).attr('preView')){
                imgList.push({
                    src: $(this).attr('src')
                })
            }
        });
        console.log(imgList);

        function slide() {
            var _html = '';
            for(var i=0;i<imgList.length;i++){
                _html +=
                    '<div class="slide">' +
                    '   <div class="middleOut">' +
                    '       <div class="middleIn">' +
                    '           <img src="' + imgList[i].src + '" alt="">' +
                    '       </div>' +
                    '   </div>' +
                    '</div>';
            }
            return _html
        }


        var _html = '' +
            '<div class="preview" id="preview">' +
            '    <div class="previewMask"></div>' +
            '    <div class="previewContainer">' +
            '        <div class="closePreview"></div>' +
            '        <div class="swipe" id="previewSwipe">' +
            '            <div class="swipeContainer">' +
                            slide() +
            '            </div>' +
            '            <div class="navigation"><!-- 圆点 --></div>' +
            '            <div class="pagination"><!-- 上一页下一页 --></div>' +
            '        </div>' +
            '    </div>' +
            '</div>';

        $('body').append(_html);
        $('#previewSwipe .slide').eq(0).addClass('active');
        var maxHeight = $('#previewSwipe').height();
        $('#previewSwipe img').css('max-height',maxHeight + 'px');

        $('#previewSwipe').swipe({
            autoPlay: false
        });


        $('.closePreview').click(function () {
            $('#preview').remove()
        });

    },

    customSwipe: function (params) {
        var _this = $(this);
        params = params ? params : {};
        var item = params.slide ? params.slide : 1;

        // slider 间距 传入参数的两倍
        var spaceBetween = params.spaceBetween ? params.spaceBetween : 0;
        if(params.autoPlay == true || params.autoPlay == undefined){
            // params.autoPlay = 3000
            console.log('autoPlay')
            params.autoPlay = 5000
        }
        var init = {
            autoPlay: params.autoPlay ? params.autoPlay : false,
        };
        console.log('init.autoPlay',init.autoPlay)

        var width = 100 / item;
        var next = $(this).find('.next');
        var prev = $(this).find('.prev');
        var wrapper = $(this).find('.customSwipeContainer');
        var ul = $(this).find('.customWarp');
        var li = $(this).find('.customSlide');

        li.css({
            width: width + '%',
            padding: '0 ' + spaceBetween
        });

        ul.css({
            margin: '0 -' + spaceBetween
        });

        for(var ali = 0;ali<item-1;ali++){
            ul.append(li.eq(ali).prop("outerHTML"));
            ul.prepend(li.eq(li.length - ali - 1).prop("outerHTML"));
        }

        var length = $(this).find('.customSlide').length;
        // var distance = swipe.width() * width / 100 +  parseFloat(spaceBetween);
        var distance = $(this).find('.customSlide').eq(0).width() + 2 * parseFloat(spaceBetween);
        console.log('distance >>>',distance)
        var i = item - 1;
        ul.css('left',-distance * i + 'px');

        function nextItem() {
            i++;
            ul.stop(true).animate({
                'left': -distance * i + 'px'
            },function () {
                if(i >= length - item){
                    i = item - 2;
                    ul.css('left',-distance * i + 'px');
                }
            });
        }

        function prevItem() {
            i--;
            ul.stop(true).animate({
                'left': -distance * i + 'px'
            },function () {
                if(i < 0){
                    i = length - item - (item - 1);
                    ul.css('left',-distance * i + 'px');
                }
            });
        }

        next.click(function () {
            nextItem()
        });

        prev.click(function () {
            prevItem()
        });



        var t;
        if(init.autoPlay){
            t = setInterval(nextItem,init.autoPlay)
        }


        // var t = setInterval(nextItem,3000);
        _this.hover(function () {
            if(init.autoPlay){
                clearInterval(t)
            }
        },function () {
            if(init.autoPlay){
                t = setInterval(nextItem,3000)
            }
        })

    }
});

// banner
$('.banner').setSize(1920,635);
if($('#banner')){
    $('#banner').swipe();
}


function customCompanyNav() {
    var companyNameList = $('.newHomeCompanyNameList');
    var companyNames = $('.newHomeCompanyNameList .newHomeCompanyName');
    // var companys = $('.newHomeCompanyListView ul');
    // companyNames.eq(0).addClass('active');
    var companyNext = $('.newHomeCompanyNamePagination .next');
    var companyPrev = $('.newHomeCompanyNamePagination .prev');
    var itemWidth = companyNames.eq(0)[0].offsetWidth;

    var nowIndex = getIndex();
    companyNames.eq(nowIndex).find('a').attr('href','javascript:void(0)');
    changeToIndex(nowIndex);

    companyNext.click(function () {
        nowIndex++;
        changeToIndex(nowIndex)
    });
    companyPrev.click(function () {
        nowIndex--;
        changeToIndex(nowIndex)
    });
    companyNames.each(function (index) {
        // $(this).click(function () {
        //     changeToIndex(index)
        // })
        // console.log($(this).find('a').attr('href'))
    });

    function changeToIndex(index) {
        // companyNames.eq(index).addClass('active').siblings('.newHomeCompanyName').removeClass('active');
        // companys.eq(index).addClass('active').siblings('ul').removeClass('active');
        var scrollIndex;
        var end = companyNames.length - 5;

        if(index >= end){
            nowIndex = end;
            scrollIndex = end;
            companyNext.find('span').attr('disabled','disabled')
        }else if(index <= 0){
            nowIndex = 0;
            scrollIndex = 0;
            companyPrev.find('span').attr('disabled','disabled')
        }else {
            scrollIndex = index;
            companyNext.find('span').removeAttr('disabled');
            companyPrev.find('span').removeAttr('disabled');
        }

        // companyNames.eq(0).stop(true).animate({
        //     marginLeft: -itemWidth * scrollIndex + 'px'
        // },100)
        console.log(itemWidth * scrollIndex)
        companyNameList.scrollLeft(itemWidth * scrollIndex)
    }

    function getIndex() {
        for(var i=0;i<companyNames.length;i++){
            if(companyNames.eq(i).hasClass('active')){
                return i
            }
        }
    }



}


