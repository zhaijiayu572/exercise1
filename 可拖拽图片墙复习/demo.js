var oContainer = document.getElementById("container");
var aImg = oContainer.getElementsByTagName("img");
var iZindex = 1;
var oCollide = null;
for(var i=aImg.length-1;i>=0;i--){
    aImg[i].style.left = aImg[i].offsetLeft + 'px';
    aImg[i].style.top = aImg[i].offsetTop + 'px';
    aImg[i].style.position = "absolute";
    aImg[i].style.margin = 0;
    drag(aImg[i]);
    aImg[i].pos = {
        left:aImg[i].offsetLeft,
        top:aImg[i].offsetTop
    }
}
function drag(elem) {
    elem.onmousedown = function (e) {
        e = e||window.event;
        var iDisX = e.clientX - elem.offsetLeft;
        var iDisY = e.clientY - elem.offsetTop;
        elem.style.zIndex = iZindex++;
        document.onmousemove = function (e) {
            e = e || window.event;
            var iLeft = e.clientX - iDisX;
            var iTop = e.clientY - iDisY;
            elem.style.left = iLeft +"px";
            elem.style.top = iTop + 'px';
            var aCollide = [];
            for(var i=0;i<aImg.length;i++){

                if(elem == aImg[i]){
                    continue;
                }
                var isCollide = checkCollision(elem,aImg[i]);
                if(isCollide){
                    aCollide.push(aImg[i]);
                }
                aImg[i].className = '';
            }
            if(aCollide.length > 0){
                oCollide = neareast(elem,aCollide);
                oCollide.className = "collide";
            }else{
                oCollide = null;
            }
            return false;
        }
    };
    elem.onmouseup = function () {
        console.log(elem);
        if(oCollide){
            var oExchange = {};
            animate(elem,oCollide.pos);
            animate(oCollide,elem.pos);
            oExchange = elem.pos;
            elem.pos = oCollide.pos;
            oCollide.pos = oExchange;
            oCollide.className = '';
            oCollide = null;
        }else{
            console.log(elem);
            animate(elem,elem.pos);
        }

        document.onmousemove = null;
    }
}
function checkCollision(elem,target) {
    var elemLeft = elem.offsetLeft,
        elemRight = elem.offsetLeft + elem.offsetWidth,
        elemTop = elem.offsetTop,
        elemBottom = elem.offsetTop + elem.offsetHeight;
    var targetLeft = target.offsetLeft,
        targetRight = target.offsetLeft + target.offsetWidth,
        targetTop = target.offsetTop,
        targetBottom = target.offsetTop + target.offsetHeight;
    return !(elemRight < targetLeft || elemLeft > targetRight ||
    elemBottom < targetTop || elemTop > targetBottom)
}
function neareast(elem,attr) {
    var iMin = 99999999999;
    var iIndex = -1;
    for(var i=0;i<attr.length;i++){
        var iX = elem.offsetLeft - attr[i].offsetLeft;
        var iY = elem.offsetTop -attr[i].offsetTop;
        var iDis = iX*iX + iY*iY;
        if(iDis < iMin){
            iMin = iDis;
            iIndex = i;
        }

    }
    return attr[iIndex];
}