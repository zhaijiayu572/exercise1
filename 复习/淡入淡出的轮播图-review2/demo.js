var oContent = document.getElementById('content');
var aImg = oContent.getElementsByTagName('img');
var oList = document.getElementById('list');
var aLi = oList.getElementsByTagName('li');
var oPrev = document.getElementById('prev');
var oNext = document.getElementById('next');
var iIndex = aImg.length;
var iNow = 0;
for(var i=0;i<aImg.length;i++){
    aImg[i].style.zIndex = aImg.length - i;
    aLi[i].index = i;
    aLi[i].onmouseover = function () {
        changeImg(this.index);
        iNow = this.index;
    }
}
oPrev.onclick = function () {
    iNow --;
    if(iNow<0){
        iNow = aImg.length-1;
    }
    changeImg(iNow)
};
oNext.onclick = function () {
    iNow++;
    if(iNow>=aImg.length){
        iNow = 0;
    }
    changeImg(iNow);
};
function changeImg(index) {
    for(var i=0;i<aLi.length;i++){
        aLi[i].className = "";
    }
    aLi[index].className = "selected";
    var oImg = aImg[index];
    oImg.style.opacity = 0;
    oImg.style.filter = "alpha[opacity=0]";
    oImg.style.zIndex = ++iIndex;
    animate(oImg,{opacity:100});
}
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
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(current != attr[prop]){
                bFlag = false;
            }
            if(prop == "opacity"){
                elem.style.opacity = (current + speed)/100;
                elem.style.filter = "alpha(opacity="+(current + speed)+")";
            }else {
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
