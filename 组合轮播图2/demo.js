var oContainer = document.getElementById("container");
var oBigImg = document.getElementById('big-img');
var aBigLi = oBigImg.getElementsByTagName('li');
var oSmallImg = document.getElementById('small-img');
var aSmallLi = oSmallImg.getElementsByTagName('li');
var oLeft = document.getElementById('left');
var oRight = document.getElementById('right');
var oLeftBtn = document.getElementById('left-btn');
var oRightBtn = document.getElementById('right-btn');
var oNum = document.getElementById('num');
var oLeftText = document.getElementById('left-text');
var iNow = 0;
var iIndex = 1;
oLeft.onmouseover = oRight.onmouseover = function () {
    if(this == oLeft){
        animate(oLeft,{opacity:100});
    }else {
        animate(oRight,{opacity:100});
    }
};
oLeft.onmouseout = oRight.onmouseout = function () {
    if(this == oLeft){
        animate(oLeft,{opacity:0});
    }else {
        animate(oRight,{opacity:0});
    }
};
oLeftBtn.onclick = function () {
    iNow -- ;
    if(iNow<0){
        iNow = aBigLi.length-1;
    }
    changeImg(iNow);
};
oRightBtn.onclick = function () {
    iNow++;
    if(iNow > aBigLi.length-1){
        iNow = 0;
    }
    changeImg(iNow);
};
for(var j=0;j<aSmallLi.length;j++){
    aSmallLi[j].index = j;
    aSmallLi[j].onmouseover = function () {
        this.style.opacity = 1;
        this.style.filter = "alpha(opacity=100)";
    };
    aSmallLi[j].onmouseout = function () {
        if(this.index != iNow){
            this.style.opacity = 0.6;
            this.style.filter = "alpha(opacity=60)";
        }
    };
    aSmallLi[j].onclick = function () {
        if(this.index != iNow){
            iNow = this.index;
            changeImg(iNow);
        }
    }
}
oContainer.onselectstart = function () {
    return false;
};
var timer = setInterval(function () {
    oRightBtn.onclick();
},3000);
oContainer.onmouseover = function () {
    clearInterval(timer);
};
oContainer.onmouseout = function () {
    timer = setInterval(function () {
        oRightBtn.onclick();
    },3000);
};
function changeImg(index) {
    aBigLi[index].style.height = 0;
    aBigLi[index].style.zIndex = iIndex++;
    animate(aBigLi[index],{height:320});
    oNum.innerHTML = iNow + 1;
    oLeftText.innerHTML = aBigLi[index].getElementsByTagName('img')[0].title;
    for(var i=0;i<aSmallLi.length;i++){
        aSmallLi[i].style.opacity = 0.6;
        aSmallLi[i].style.filter = "alpha(opacity=60)";
    }
    aSmallLi[index].style.opacity = 1;
    aSmallLi[index].style.filter = "alpha(opacity=100)";
    if(index <= 1){
        animate(oSmallImg,{left:0});
    }else if(index >= aSmallLi.length-2){
        animate(oSmallImg,{left:-(aSmallLi.length-3)*(aSmallLi[0].offsetWidth+10)});
    }else{
        animate(oSmallImg,{left:-(index-1)*(aSmallLi[0].offsetWidth+10)});
    }
}

