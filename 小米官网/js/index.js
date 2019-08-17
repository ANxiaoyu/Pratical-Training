$(document).ready(function(){
    $(".site-topbar .topbar-cart").mouseenter(function(){
       $(this).addClass('active');
       $(this).find('.cart-menu').css("height", "100px");
       $(this).find('.loading').addClass('hide');
       $(this).find('.msg-empty').removeClass('hide');
    })
    $(".site-topbar .topbar-cart").mouseleave(function(){
        $(this).removeClass('active');
        $(this).find('.cart-menu').css("height", "0px");       
    })

    //头部导航，鼠标移入显示，移除隐藏
    $('.site-header .nav-item').on('mouseenter','.link', function(){
        $(this).css('color','#ff6700');
        $(this).next().addClass('active');
        // console.log($(this).parent().index());
        // var index = $(this).parent().index();
        // console.log($(this).parent().eq(index));
        // $(this).parent().not().eq(index).css("color","#333");
        // $(this).parent().eq(index).find('.item-children').not().removeClass('active');
        $(this).next().mouseenter(function(){
            $(this).addClass('active');
        })
        $(this).next().mouseleave(function(){
            $(this).removeClass('active');
        })
    })
    $('.site-header .nav-item').on('mouseleave','.link',function(){
        $(this).css('color','#333');
        $(this).next().removeClass('active');
    })
    
   // 当鼠标移入左边的导航条li时，导航条背景为变色，并且显示对应的div
   $('.site-header .category-item').on('mouseenter',function(){
       $(this).addClass('active');
       $(this).find('.children').show();
   })
   $('.site-header .category-item').on('mouseleave',function(){
        $(this).removeClass('active');
        $(this).find('.children').hide();
    })

    //幻灯片
    var index = 0;
    // 点击底部小圆点
    $('.swiper-pagination .swiper-pagination-bullet').click(function(){
        index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.swiper-wrapper').children().eq(index).fadeIn().siblings().fadeOut();
    })
    // 点击左箭头
    $('.swiper-button-left').click(function(){
        index--;
        // 当图片到了第一张前，跳转到最后一张
        if(index < 0) index = 4;
        $('.swiper-wrapper').children().eq(index).fadeIn().siblings().fadeOut();
        $('.swiper-pagination .swiper-pagination-bullet').eq(index).addClass('active').siblings().removeClass('active');
    })
    // 点击右箭头
    $('.swiper-button-right').click(function(){
        index++;
        // 当图片到最后一张之后，跳到第一张
        if(index > 4) index=0;
        $('.swiper-wrapper').children().eq(index).fadeIn().siblings().fadeOut();
        $('.swiper-pagination .swiper-pagination-bullet').eq(index).addClass('active').siblings().removeClass('active');
    })
    // 自动轮播
    function autoPlay() {
        timer = setInterval(function(){
            index++;
            if(index > 4) index=0;
            $('.swiper-wrapper').children().eq(index).fadeIn().siblings().fadeOut();
            $('.swiper-pagination .swiper-pagination-bullet').eq(index).addClass('active').siblings().removeClass('active');
        },5000);
    }
    autoPlay();
    // 鼠标进入时停止，离开时再自动轮播
    $('.swiper-container').hover(function(){
        clearInterval(timer);
    },autoPlay);
    // setInterval(function(){
    //     var imgs=$('.swiper-wrapper img');
    //     imgs.eq(4).stop().fadeOut(700,function(){
    //         $(this).show().prependTo('.swiper-wrapper');
          
    //     });
    // },3000);
    

})