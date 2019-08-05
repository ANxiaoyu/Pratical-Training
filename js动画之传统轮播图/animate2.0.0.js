/**
 * 1、运动时间间隔interval
 * 2、动画总共运行的次数，帧数totalFrame = 总共运行时间duration / 运动时间间隔interval 3000/20=150
 * 3、动画运动对象的初始信息值 objSingleValue  leftSingValue=50 heightSingValue=50
 * 4、动画从初始状态到最终状态的一个总的变化量 totalChange = 目标值target - 初始值objSingleValue 510-50=460
 * 5、动画每一帧的变化量 stepChange = 总的变化量totalChange / 总的帧数totalFrame 460/150 = 3.07
 */

 /**
  * 运动框架
  * @elem 待运动的对象
  * @targetJson 对象运动的终点位置
  * @duration 动画的持续时间
  * @callback  回调函数 当动画结束的时候需要执行的操作
  * @tweenString 动画运动的算法
  */
 function animate(elem, targetJson, duration, tweenString, callback) {
    
    if(tweenString == "" || tweenString == null) {
        tweenString = "Linear";
    }
    if(callback == "" || callback == null) {
        callback = null;
    }
    
    // 定义动画运动时间的间隔20毫秒
    var interval = 20;
    // 用来存储每一个属性的默认初始值
    var objInitJson = {};
    for(var attr in targetJson) {
        objInitJson[attr] = parseInt(fetchObjectInitAttrValue(elem, attr));
    }
    // 动画运动的总次数 总帧数
    var totalFrames = duration / interval;

    // 用来存储每一个属性的总的变化量
    var totalChange = {};
    for(var attr in targetJson) {
        totalChange[attr] = targetJson[attr] - objInitJson[attr];
    }

    // 每一个属性在每一帧的变化量 = 属性的总的变化量 / 运动的总帧数
    var objStepJson = {};
    for(var attr in targetJson) {
        objStepJson[attr] = parseFloat(totalChange[attr] / totalFrames);
    }

    elem.isanimated = true;

    var currentLocation = 0;
    var frameCounts = 0;
    var timer = setInterval(function(){
        frameCounts++;
        for(var attr in objStepJson) {
            if(attr == "opacity"){
              currentLocation = Tween[tweenString](frameCounts,objInitJson[attr], totalChange[attr], totalFrames);
               elem.style[attr] = currentLocation;
            }else{
                currentLocation=Tween[tweenString](frameCounts, objInitJson[attr], totalChange[attr], totalFrames);
                elem.style[attr] = currentLocation + "px";
            }         
        }
        if(frameCounts > totalFrames) {
            for(var attr in objStepJson) { //每一帧变化量除不尽的时候
               if(attr == "opacity"){
                   elem.style[attr] = objInitJson[attr];
               }else{
                   elem.style[attr] = targetJson[attr] + "px";
               }             
            }
            clearInterval(timer);
            callback && callback.call(elem);
            elem.isanimated = false;
        }
    },interval);


}

/**
 * 获取对象的属性值
 * @elem 需要获取的属性值的对象
 * @attr 获取的属性值的名称
 * @return 获取的属性值，不带单位
 */
function fetchObjectInitAttrValue(elem, attr) {
    var attrValue = window.getComputedStyle(elem)[attr];
    if(attr == "opacity"){
        return attrValue;
    }
    return attrValue.split("px")[0];
}


var Tween = {
    /**
        t: 当前动画运行的帧数(也就是说动画在哪一帧运动 frameCounts)
        b: 当前运动对象的初始值(initValue)
        c: 对象从开始运动到结束总的运动变化量(totalChange)
        d: 动画运行的总帧数(totalFrames)
    **/
    Linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    //二次的
    QuadEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    QuadEaseOut: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    QuadEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    //三次的
    CubicEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    CubicEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    CubicEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    //四次的
    QuartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    QuartEaseOut: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    QuartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    QuartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    QuartEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    QuartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    //正弦的
    SineEaseIn: function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    SineEaseOut: function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    SineEaseInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    ExpoEaseIn: function(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    ExpoEaseOut: function(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    ExpoEaseInOut: function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    CircEaseIn: function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    CircEaseOut: function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    CircEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    ElasticEaseIn: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    ElasticEaseOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    ElasticEaseInOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    //冲过头系列
    BackEaseIn: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    //弹跳系列
    BounceEaseIn: function(t, b, c, d) {
        return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    BounceEaseInOut: function(t, b, c, d) {
        if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
        else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
}