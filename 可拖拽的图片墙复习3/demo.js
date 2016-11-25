var oContainer = document.getElementById('container');
var aImg = document.getElementsByTagName('img');
var iZindex = aImg.length;
var oCollide = null;
for(var i=aImg.length-1;i>=0;i--){
    aImg[i].style.left = aImg[i].offsetLeft + 'px';
    aImg[i].style.top = aImg[i].offsetTop + 'px';
    aImg[i].style.position = "absolute";
    aImg[i].style.margin = 0;
    aImg[i].pos = {
        left:aImg[i].offsetLeft,
        top:aImg[i].offsetTop
    };
    drag(aImg[i]);
}
function drag(elem) {
        elem.onmousedown = function(e){
            e = e || window.event;
            var iDisX= e.clientX - elem.offsetLeft;
            var iDisY = e.clientY - elem.offsetTop;
            elem.style.zIndex = iZindex++;
            document.onmousemove = function (e) {
                e = e || window.event;
                var iLeft = e.clientX - iDisX;
                var iTop = e.clientY - iDisY;
                elem.style.left = iLeft + 'px';
                elem.style.top = iTop + 'px';
                var aCollide = [];
                for(var i=0;i<aImg.length;i++){
                    if(elem == aImg[i]){
                        continue;
                    }
                    var isCollide = checkCollide(elem,aImg[i]);
                    if(isCollide){
                        aCollide.push(aImg[i]);
                    }
                    aImg[i].className = '';
                }
                if(aCollide.length > 0){
                    oCollide = nearest(elem,aCollide);
                    oCollide.className = 'selected';
                }else {
                    oCollide = null;
                }
                return false;
            };
            document.onmouseup = function () {
                if(oCollide){
                    animate(elem,oCollide.pos);
                    animate(oCollide,elem.pos);
                    var exchange = {};
                    exchange = elem.pos;
                    elem.pos = oCollide.pos;
                    oCollide.pos = exchange;
                }else{
                    animate(elem,elem.pos);
                }
                oCollide = null;
                document.onmousemove = null;
            }
        };


}
function checkCollide(elem,target) {
    var elemLeft = elem.offsetLeft,
        elemRight = elem.offsetLeft + elem.offsetWidth,
        elemTop = elem.offsetTop,
        elemBottom = elemTop + elem.offsetHeight;
    var targetLeft = target.offsetLeft,
        targetRight = target.offsetLeft + target.offsetWidth,
        targetTop = target.offsetTop,
        targetBottom = targetTop + target.offsetHeight;
    return !(elemLeft > targetRight || elemRight < targetLeft || elemTop > targetBottom || elemBottom < targetTop);
}
function nearest(elem,arr) {
    var iMin = 99999999999;
    var iIndex = -1;
    for(var j=0;j<arr.length;j++){
        var iX = arr[j].offsetLeft - elem.offsetLeft;
        var iY = arr[j].offsetTop - elem.offsetTop;
        var iDis = iX*iX + iY*iY;
        if(iDis < iMin){
            iMin = iDis;
            iIndex = j;
        }
    }
    return arr[iIndex];
}




















