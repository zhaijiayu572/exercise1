function getStyle(elem,prop) {        //Obtain the elements of style
    if(elem.currentStyle){
        return elem.currentStyle[prop];        //IE
    }else{
        return getComputedStyle(elem,null)[prop];
    }
}
function animate(elem,attr,callback) {
    clearInterval(elem.timer);
    elem.timer = setInterval(function () {         //Set the timer
        var bFlag = true;                          // If it is true, stop the timer
        for(var prop in attr){
            var current = parseInt(getStyle(elem,prop));
            if(prop == 'opacity'){
                current =parseInt(getStyle(elem,prop)*100);
            }
            var speed = (attr[prop] - current)/8;                     //Get speed
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);   //Take the whole speed
            if(current != attr[prop]){
                bFlag = false;
            }
            if(prop == 'opacity'){
                elem.style.opacity = (current + speed)/100;
                elem.style.filter = "alpha(opacity"+(current+speed)+")";
            }else{
                elem.style[prop] = current + speed + "px";
            }
        }
        if(bFlag){
            clearInterval(elem.timer);
            callback && callback();
        }

    },30)
}
