var oContainer = document.getElementById('container');
var oLeft = document.getElementById('left');
var oRight = document.getElementById('right');
var oBigImg = document.getElementById('big-img');
var aBigLi = oBigImg.getElementsByTagName('li');
var oPrev = document.getElementById('prev');
var oNext = document.getElementById('next');
var oSmallImg = document.getElementById('small-img');
var aSmallLi = oSmallImg.getElementsByTagName('li');
var oLeftText = document.getElementById('left-text');
var oNumber = document.getElementById('number');
oLeft.onmouseover = oRight.onmouseover = function () {
    if(this==oLeft){
        animate(oPrev,{opacity:100});
        animate(oNext,{opacity:0});
    }else{
        animate(oPrev,{opacity:0});
        animate(oNext,{opacity:100});
    }
};

oLeft.onmouseout = oRight.onmouseout = function () {
    animate(oPrev,{opacity:0});
    animate(oNext,{opacity:0});
};
var iNow = 0;
oPrev.onclick = oNext.onclick = function () {
    if(this==oPrev){
        iNow--;
        if(iNow<0){
            iNow = aBigLi.length-1;
        }
    }else {
        iNow++;
        if(iNow>aBigLi.length-1){
            iNow = 0;
        }
    }
    changeImg(iNow);
};
for(var i=0;i<aSmallLi.length;i++){
    aSmallLi[i].onmouseover = function () {
        this.style.opacity = 1;
    };
    aSmallLi[i].onmouseout = function () {
        this.style.opacity = 0.5;
    };
    aSmallLi[i].index = i;
    aSmallLi[i].onclick = function () {
        iNow = this.index;
        changeImg(iNow);
    }
}
var timer = setInterval(function () {
    oNext.onclick();
},1500);
oContainer.onmouseover = function () {
    clearInterval(timer);
};
oContainer.onmouseout = function () {
    timer = setInterval(function () {
        oNext.onclick();
    },1500)
};
var iZindex = 0;
var iBigLiHeight = aBigLi[0].offsetHeight;
function changeImg(index) {
    aBigLi[index].style.zIndex = ++iZindex;
    aBigLi[index].style.height=0+'px';
    animate(aBigLi[index],{height:iBigLiHeight});
    oLeftText.innerHTML = aBigLi[index].children[0].title;
    oNumber.innerHTML = index+1;
    for (var i=0;i<aSmallLi.length;i++){
        aSmallLi[i].className = '';
    }
    aSmallLi[index].className = "selected";
    if(index<2){
        animate(oSmallImg,{left:0});
    }else if(index>aSmallLi.length-2){
        animate(oSmallImg,{left:-(aSmallLi[0].offsetWidth+10)*3});
    }else {
        animate(oSmallImg,{left:-(aSmallLi[0].offsetWidth+10)*(index-1)});
    }
}