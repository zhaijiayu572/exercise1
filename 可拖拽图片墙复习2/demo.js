var oContainer = document.getElementById("container");
var aImg = oContainer.getElementsByTagName('img');
var iZindex = 0;
var oCollide = null;
for(var i=aImg.length-1;i>=0;i--){
    aImg[i].style.left = aImg[i].offsetLeft + 'px';
    aImg[i].style.top = aImg[i].offsetTop + 'px';
    aImg[i].style.position = 'absolute';
    aImg[i].style.margin = 0;
    drag(aImg[i]);
    aImg[i].pos = {
        left : aImg[i].offsetLeft,
        top : aImg[i].offsetTop
    }
}
function drag(elem) {
    elem.onmousedown = function (e) {
        e = e || window.event;
        var iDisX = e.clientX - elem.offsetLeft;
        var iDisY = e.clientY - elem.offsetTop;
        elem.style.zIndex = ++iZindex;
        document.onmousemove = function (e) {
            e = e || window.event;
            var iLeft = e.clientX - iDisX;
            var iTop = e.clientY - iDisY;
            elem.style.left = iLeft + 'px';
            elem.style.top = iTop + 'px';
            var aCollide = [];
            for(var j=0;j<aImg.length;j++){

                if(elem == aImg[j]){
                    continue;
                }
                var bIsCollide = checkCollide(elem,aImg[j]);
                if(bIsCollide){
                    aCollide.push(aImg[j]);
                }
                aImg[j].className = "";
            }
            if(aCollide.length>0){
                oCollide = nearest(elem,aCollide);
                oCollide.className = "collide";
            }else{
                oCollide = null;
            }
            return false;
        }
    };
    elem.onmouseup = function () {
        if(oCollide){
            var oChange = {};
            animate(elem,oCollide.pos);
            animate(oCollide,elem.pos);
            oChange = oCollide.pos;
            oCollide.pos = elem.pos;
            elem.pos = oChange;
        }else{
            animate(elem,elem.pos);
        }
        oCollide.className = "";
        oCollide = null;
        document.onmousemove = null;
    }
}
function checkCollide(elem,target) {
    var elemLeft = elem.offsetLeft,
        elemRight = elem.offsetLeft + elem.offsetWidth,
        elemTop = elem.offsetTop,
        elemBottom = elem.offsetTop + elem.offsetHeight;
    var targetLeft = target.offsetLeft,
        targetRight = target.offsetLeft + target.offsetWidth,
        targetTop = target.offsetTop,
        targetBottom = target.offsetTop + target.offsetHeight;
    return !(elemLeft > targetRight || elemRight < targetLeft || elemBottom < targetTop || elemTop > targetBottom);
}
function nearest(elem,arr) {
    var iMin = 999999999;
    var iIndex = -1;
    for(var i=0;i<arr.length;i++){
        var iX = elem.offsetLeft - arr[i].offsetLeft;
        var iY = elem.offsetTop - arr[i].offsetTop;
        var iDis = iX*iX + iY*iY;
        if(iDis<iMin){
            iMin = iDis;
            iIndex = i;
        }
    }
    return arr[iIndex];
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
            speed = speed >0 ? Math.ceil(speed) : Math.floor(speed);
            if(current != attr[prop]){
                bFlag = false;
            }
            if(prop == "opacity"){
                elem.style.opacity = (current + speed)/100;
                elem.style.filter = "alpha(opacity="+(current + speed)+")";
            }else {
                elem.style[prop] = current + speed + 'px';
            }
        }
        if(bFlag){
            clearInterval(elem.timer);
            callback && callback();
        }
    },30)

}
function getStyle(elem,prop) {
    if(elem.currentStyle){
        return elem.currentStyle[prop];
    }else {
        return getComputedStyle(elem,null)[prop];
    }
}
















