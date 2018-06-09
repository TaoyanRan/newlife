(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {

            var clientWidth = docEl.clientWidth;
            console.log(clientWidth);
            if(!clientWidth) return;

            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
                docEl.style.fontSize = clientWidth / 7.5 + 'px'; // 默认iPhone6 750设计稿
                console.log('mobile',docEl.style.fontSize)
            }else {
                docEl.style.fontSize = clientWidth / 16 + 'px'; // 主题内容 62.5% = 10rem
                console.log('PC',docEl.style.fontSize);
            }



            // var meta = document.getElementsByTagName('meta');
            // var scale = .4;
            // meta["viewport"].setAttribute('content',"width=device-width,initial-scale=" + scale + ",minimum-scale=0.1,maximum-scale=3,user-scalable=yes");

		};

	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
			 