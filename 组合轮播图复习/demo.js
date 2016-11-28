var oContainer = document.getElementById('container');
var oBigImg = document.getElementById('big-img');
var aBigLi = oBigImg.getElementsByTagName('li');
var oSmallImg = document.getElementById('small-img');
var aSmallLi = oSmallImg.getElementsByTagName('li');
var oLeft = document.getElementById('left');
var oRight = document.getElementById('right');
var oLeftBtn = document.getElementById('left-btn');
var oRightBtn = document.getElementById('right-btn');
var oLeftText = document.getElementById('left-text');
var oNum = document.getElementById('num');
var iNow = 0;
var iZindex = 1;
function changeImg(index) {
    oNum.innerHTML = index+1;
    oLeftText.innerHTML = aBigLi[index].getElementsByTagName('img')[0].title;
    aBigLi[index].style.height = 0;
    aBigLi[index].style.zIndex = iZindex++;
    animate(aBigLi[index],{height:320});
    for(i=0;i<aSmallLi.length;i++){
        aSmallLi[i].style.opacity = 0.5;
    }
    aSmallLi[index].style.opacity = 1;
    if(index<=1){
        animate(oSmallImg,{left:0});
    }else if(index>=aSmallLi.length-2){
        animate(oSmallImg,{left:-(aSmallLi[0].offsetWidth+10)*(aSmallLi.length-3)});
    }else{
        animate(oSmallImg,{left:-(aSmallLi[0].offsetWidth+10)*(index-1)});
    }
}
var timer = setInterval(function () {
    oRightBtn.onclick();
},2000);
oContainer.onmouseover = function () {
    clearInterval(timer);
};
oContainer.onmouseout = function () {
    timer = setInterval(function () {
        oRightBtn.onclick();
    },2000);
};
for(var i=0;i<aSmallLi.length;i++){
    aSmallLi[i].index = i;
    aSmallLi[i].onmouseover = function () {
        this.style.opacity = 1;
    };
    aSmallLi[i].onmouseout = function () {
        if(this.index != iNow){
            this.style.opacity = 0.5;
        }
    };
    aSmallLi[i].onclick = function () {
        iNow = this.index;
        changeImg(iNow);
    }

}
oLeft.onmouseover = oRight.onmouseover = function () {
    if(this == oLeft){
        animate(oLeft,{opacity:100});
        animate(oRight,{opacity:0});
    }else{
        animate(oRight,{opacity:100});
        animate(oLeft,{opacity:0});
    }

};
oLeft.onmouseout = oRight.onmouseout = function () {
    animate(oLeft,{opacity:0});
    animate(oRight,{opacity:0});
};
oLeftBtn.onclick = function () {
    iNow --;
    if(iNow<0){
        iNow = aSmallLi.length - 1;
    }
    changeImg(iNow);
};
oRightBtn.onclick = function () {
    iNow++;
    if(iNow>aSmallLi.length-1){
        iNow = 0;
    }
    changeImg(iNow);
};

