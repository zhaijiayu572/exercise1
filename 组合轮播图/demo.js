(function () {
    var oContainer = document.getElementById('container');
    var oSlideBar = document.getElementById('slide-bar');
    var aSlideImg = oSlideBar.getElementsByTagName("img");
    var oContent = document.getElementById('content');
    var aConDiv = oContent.getElementsByTagName('div');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');
    for(i=0;i<aConDiv.length;i++){
        aConDiv[i].style.background = "url('img/"+(i+1)+".jpg')";
    }
    var iHeight = aConDiv[0].offsetHeight;
    var iSlideMax = aSlideImg[0].offsetWidth*(aSlideImg.length-3);
    var iNow = 0;
    var iNowIndex = aConDiv.length;
    for(var k=0;k<aSlideImg.length;k++){
        aSlideImg[k].onmouseover = function () {
            this.className = "selected";
        };
        aSlideImg[k].onmouseout = function () {
            this.className = '';
            aSlideImg[iNow].className = 'selected';
        }
    }
    oContainer.onmouseover =function () {

        oContainer.onmousemove =function (e) {
            e = e || window.event;
            var isLeft = false;
            if(e.clientX - (this.offsetLeft+this.offsetWidth/2) < 0){
                isLeft = true;
            }
            if(isLeft){
                animate(oPrev,{opacity:100});
                animate(oNext,{opacity:0});
            }else{
                animate(oNext,{opacity:100});
                animate(oPrev,{opacity:0});
            }
        }

    };
    oContainer.onmouseout = function () {
        animate(oPrev,{opacity:0});
        animate(oNext,{opacity:0});
    };
    for(var i=0;i<aConDiv.length;i++){
        aConDiv[i].style.zIndex = aConDiv.length-i;
    }
    function changeImg(index) {
        for(var j=0;j<aSlideImg.length;j++){
            aSlideImg[j].className = '';
        }
        aSlideImg[index].className = 'selected';
        var oConDiv = aConDiv[index];
        console.log(oConDiv);
        oConDiv.style.height = 0;
        oConDiv.style.zIndex = ++iNowIndex;
        animate(oConDiv,{height:iHeight});
        var iLeft = -aSlideImg[0].offsetWidth*(index-1<0?0:index-1) ;
        if(iLeft < -iSlideMax){
            iLeft = -iSlideMax;
        }
        console.log(iLeft);
        animate(oSlideBar,{left:iLeft});
    }
    oNext.onclick = function () {
        iNow++;
        if(iNow>aConDiv.length-1){
            iNow = 0;
        }
        console.log(iNow);
        changeImg(iNow);
    };
    oPrev.onclick = function () {
        iNow--;
        if(iNow<0){
            iNow = aConDiv.length-1;
        }
        changeImg(iNow);
    }
})();
