function getStyle(elem,prop) {
    if(elem.currentStyle){
        return elem.currentStyle[prop];
    }else{
        return getComputedStyle(elem,null)[prop];
    }
}
function animate(elem,attr,callback) {
    clearInterval(elem.timer);
    elem.timer = setInterval(function () {
        var bFlag = true;
        for (var prop in attr){
            var current = parseInt(getStyle(elem,prop));
            if(prop == 'opacity'){
                current = parseInt(getStyle(elem,prop)*100);
            }
            var speed = (attr[prop] - current)/8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(attr[prop] != current){
                bFlag = false;
            }
            if(prop == "opacity"){
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
