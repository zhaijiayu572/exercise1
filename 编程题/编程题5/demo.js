(function () {
    var oContainer = document.getElementById('container');
    var oSlideBar = document.getElementById('slide-bar');
    var aSlideImg = oSlideBar.getElementsByTagName("img");
    var oContent = document.getElementById('content');
    var aConImg = oContent.getElementsByTagName('img');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');
    var iHeight = aConImg[0].offsetHeight;
    var iSlideMax = aSlideImg[0].offsetWidth*(aSlideImg.length-3);
    var iNow = 0;
    var iNowIndex = aConImg.length;
    for(var k=0;k<aSlideImg.length;k++){
        aSlideImg[k].onmouseover = function () {
            this.className = "selected";
        };
        aSlideImg[k].onmouseout = function () {
            this.className = '';
            aSlideImg[iNow].className = 'selected';
        }
    }
    oContainer.onmouseover =function (e) {

        oContainer.onmousemove =function (e) {
            e = e || window.event;
            var isLeft = false;
            if(e.clientX - (this.offsetLeft+this.offsetWidth/2) < 0){
                isLeft = true;
            }
            if(isLeft){
                oPrev.style.display = "block";
                oNext.style.display = 'none';
            }else{
                oNext.style.display = "block";
                oPrev.style.display = 'none';
            }
        }

    };
    oContainer.onmouseout = function () {
        oPrev.style.display = 'none';
        oNext.style.display = 'none';
    };
    for(var i=0;i<aConImg.length;i++){
        aConImg[i].style.zIndex = aConImg.length-i;
    }
    function changeImg(index) {
        for(var j=0;j<aSlideImg.length;j++){
            aSlideImg[j].className = '';
        }
        aSlideImg[index].className = 'selected';
        var oConImg = aConImg[index];
        console.log(oConImg);
        oConImg.style.height = 0;
        oConImg.style.zIndex = ++iNowIndex;
        animate(oConImg,{height:iHeight});
        var iLeft = -aSlideImg[0].offsetWidth*(index-1<0?0:index-1) ;
        if(iLeft < -iSlideMax){
            iLeft = -iSlideMax;
        }
        console.log(iLeft);
        animate(oSlideBar,{left:iLeft});
    }
    oNext.onclick = function () {
        iNow++;
        if(iNow>aConImg.length-1){
            iNow = 0;
        }
        console.log(iNow);
        changeImg(iNow);
    };
    oPrev.onclick = function () {
        iNow--;
        if(iNow<0){
            iNow = aConImg.length-1;
        }
        changeImg(iNow);
    }
})();
