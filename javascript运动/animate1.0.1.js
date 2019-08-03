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
  * @callback  回调函数
  */
 function animate(elem, targetJson, duration, callback) {
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

     var runCounts = 1;
     var timer = setInterval(function(){
         runCounts++;
         for(var attr in objStepJson) {
             if(attr == "opacity"){
                objInitJson[attr] += objStepJson[attr];
                elem.style[attr] = objInitJson[attr];
             }else{
                objInitJson[attr] += objStepJson[attr];
                elem.style[attr] = objInitJson[attr] + "px";
             }
            
         }
         if(runCounts > totalFrames) {
             for(var attr in objStepJson) { //每一帧变化量除不尽的时候
                if(attr == "opacity"){
                    elem.style[attr] = targetJson[attr];
                }else{
                    elem.style[attr] = targetJson[attr] + "px";
                }             
             }
             clearInterval(timer);
             callback.call(elem);
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