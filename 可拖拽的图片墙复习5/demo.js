var oContainer = document.getElementById("container");
var aImg = oContainer.getElementsByTagName('img');
var iZindex = 1;
var oCollide = null;
for(var i=aImg.length-1;i>=0;i--){
    aImg[i].style.left = aImg[i].offsetLeft + 'px';
    aImg[i].style.top = aImg[i].offsetTop+ 'px';
    aImg[i].style.position = "absolute";
    aImg[i].style.margin = 0;
    aImg[i].pos = {
        left:aImg[i].offsetLeft,
        top:aImg[i].offsetTop
    };
    changeImg(aImg[i]);
}
function changeImg(elem) {
    elem.onmousedown = function (e) {
        e = e || window.event;
        var iDisX = e.clientX - elem.offsetLeft;
        var iDisY = e.clientY - elem.offsetTop;
        elem.style.zIndex = iZindex++;
        document.onmousemove = function (e) {
            e = e || window.event;
            var iLeft = e.clientX - iDisX;
            var iTop = e.clientY - iDisY;
            elem.style.left = iLeft + 'px';
            elem.style.top = iTop + 'px';
            var aCollide = [];
            for(var j=0;j<aImg.length;j++){
                if(aImg[j]==elem){
                    continue;
                }
                var isCollide = checkCollide(elem,aImg[j]);
                if(isCollide){
                    aCollide.push(aImg[j]);
                }
                aImg[j].className = "";
            }
            if(aCollide.length>0){
                oCollide = nearest(elem,aCollide);
                oCollide.className = "selected";
            }else{
                oCollide = null;
            }
            return false;
        };
        document.onmouseup = function () {
            if(oCollide){
                var change = {};
                animate(elem,oCollide.pos);
                animate(oCollide,elem.pos);
                change = elem.pos;
                elem.pos = oCollide.pos;
                oCollide.pos = change;
                oCollide.className = "";
                oCollide = null;
            }else{
                animate(elem,elem.pos);
            }

            document.onmousemove = null;
        }
    }
}
function nearest(elem,arr) {
    var iMin = 9999999999;
    var index = -1;
    for(var i=0;i<arr.length;i++){
        var iX = elem.offsetLeft - arr[i].offsetLeft;
        var iY = elem.offsetTop - arr[i].offsetTop;
        var iDis = iX*iX + iY*iY;
        if(iDis<iMin){
            iMin = iDis;
            index = i;
        }
    }
    return arr[index];
}
function checkCollide(elem,target) {
    var elemLeft = elem.offsetLeft,
        elemRight = elem.offsetLeft + elem.offsetWidth,
        elemTop = elem.offsetTop,
        elemBottom = elem.offsetTop + elem.offsetHeight;
    var targetLeft = target.offsetLeft,
        targetRight = targetLeft + target.offsetWidth,
        targetTop = target.offsetTop,
        targetBottom = target.offsetTop + target.offsetHeight;
    return !(elemLeft > targetRight || elemRight < targetLeft || elemBottom < targetTop || elemTop > targetBottom);
}