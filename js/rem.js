(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
            console.log(clientWidth)
			if(!clientWidth) return;
			if(clientWidth >= 1280){
                // docEl.style.fontSize = clientWidth / 13.66 + 'px';
                // docEl.style.fontSize = clientWidth / 19.2 + 'px';
                docEl.style.fontSize = '100px';

            }else if(clientWidth < 640){
				docEl.style.fontSize = clientWidth / 7.5 + 'px';
			}


			if(clientWidth <= 960){

                var meta = document.getElementsByTagName('meta');
                var scale = .4;
                meta["viewport"].setAttribute('content',"width=device-width,initial-scale=" + scale + ",minimum-scale=" + scale + ",maximum-scale=" + scale + ",user-scalable=yes");
            }


		};

	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
			 