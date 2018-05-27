// tab切换
function changeTab(tabParentDom) {
    $(tabParentDom + ' .tabHeader .tabItem').each(function (i) {
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


window.onload = function () {

    var meta = document.getElementsByTagName('meta');
    meta["viewport"].setAttribute('content',"width=320,initial-scale=0.5,minimum-scale=0.1,maximum-scale=10,user-scalable=yes");
};


