(function () {
    var oContainer = document.getElementById('container');
    var oContent = document.getElementById('content');
    var aImg = oContent.getElementsByTagName('img');
    var oImg = aImg[0].cloneNode();
    var oList = document.getElementById('list');
    var aLi = oList.getElementsByTagName('li');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');
    var iNow = 0;
    oContent.appendChild(oImg);
    oContent.style.width = aImg[0].offsetWidth * aImg.length + 'px';
    for(var i=0;i<aLi.length;i++){
        aLi[i].index = i;
        aLi[i].onmouseover = function () {
            iNow = this.index;
            change(iNow);
        }
    }
    oPrev.onclick = function () {
        iNow--;
        if(iNow<0){
            oContent.style.left = -(aImg.length-1)*aImg[0].offsetWidth +'px';
            iNow = aImg.length-2;
        }
        change(iNow);

    };
    oNext.onclick = function () {
        iNow++;
        if(iNow>aImg.length-1){
            oContent.style.left = 0 + 'px';
            iNow = 1;
        }
        change(iNow);
    };
    function change(index) {
        for(var i=0;i<aLi.length;i++){
            aLi[i].className = "";
        }
        aLi[index > aLi.length-1?0:index].className = "selected";
        var iLeft = -index * aImg[0].offsetWidth;
        animate(oContent,{left:iLeft});
    }
    var timer = setInterval(function () {
        oNext.onclick();
    },2000);
    oContainer.onmouseover = function () {
        clearInterval(timer);
    };
    oContainer.onmouseout = function () {
        timer = setInterval(function () {
            oNext.onclick();
        },2000);
    };
    function animate(elem,attr,callback) {
        clearInterval(elem.timer);
        elem.timer = setInterval(function () {
            var bFlag = true;
            for(var prop in attr){
                var current = parseInt(getStyle(elem,prop));
                if(prop == "opacity"){
                    current = parseInt(getStyle(elem,prop)*100);
                }
                var speed = (attr[prop] - current)/8;
                if(current!=attr[prop]){
                    bFlag = false;
                }
                if(prop == 'opacity'){
                    elem.style.opacity = (current + speed)/100;
                    elem.style.filter = "alpha(opacity="+(current + speed)+")";
                }else{
                    elem.style[prop] = current + speed +'px';
                }
            }
            if(bFlag){
                clearInterval(elem.timer);
                callback&&callback();
            }
        },30)
    }
    function getStyle(elem,prop) {
        if(elem.currentStyle){
            return elem.currentStyle[prop];
        }else{
            return getComputedStyle(elem,null)[prop];
        }
    }
})()
