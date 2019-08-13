// 1 实现商品显示动画效果
// 商品 hover 效果
function productHoverEffect() {
    $('#grid .product .product-detail').hover(
        function(){
            $(this).addClass('animate');
        },function(){
            $(this).removeClass('animate');
        }
    )
}

// 2 实现商品列表布局切换功能
function switchProductLayout() {
    // 2.1 large grid点击事件
    $('#gridSelector').on('click', '.large-grid', function(){
        $(this).children('a').addClass('active');
        $('#gridSelector').find('.small-grid a').removeClass('active');
        $('#grid').find('.product').addClass('large');
        // 延时执行以下代码
        setInterval(function(){
            $('#grid').find('.info-large').show();
        },500)
        $('#grid').find('.product-detail .stats').hide();
        // off解绑事件
        $('#grid .product .product-detail').off('mouseenter');
    })

    // 2.2 small grid点击事件
    $('#gridSelector').on('click', '.small-grid', function(){
        $(this).children('a').addClass('active');
        $('#gridSelector').find('.large-grid a').removeClass('active');
        $('#grid').find('.product').removeClass('large');
        $('#grid').find('.product-detail .stats').show();
        $('#grid').find('.info-large').hide();
        // 重新绑定商品hover事件
        productHoverEffect();
    })
}

// 3 实现将商品加入购物车功能
function handleAddProductToCart() {
    $('#grid').on('click', '.add-product-to-cart, .add-cart-large', function(){
        // 3.1 定位到商品卡片product-card
        var productInfo =$(this).parents('.product').find('.product-card');
        // 3.2 克隆一个商品卡片，位置与原来卡片一样，并加入到body中
        var cloneProduct = productInfo.clone().css(productInfo.offset()).appendTo('body');
        // 3.3 获得购物车对象
        var cartTarget = $('#cart');
        // 商品图片
        var productImage = productInfo.find('.product-img').attr('src');
        // 商品名称
        var productName = productInfo.find('.product-name').text();
        // 商品单价
        var productPrice = productInfo.find('.product-price').text();
        
        // 3.4 商品卡片动画animate（），改变其left,top为购物车的left,top，设置width,height，并动态加入到购物车中
        cloneProduct.animate({
            left: cartTarget.offset().left,
            top: cartTarget.offset().top + cartTarget.height(),
            width: '50px',
            height: '100px'

        },500).fadeOut('slow', function(){
           // 3.4.1 将商品加入购物车中
               
                var cartName = $('#cart').find('span.name').text();
                if(cartName !== productName) {
                    addProductToCart(productImage, productName, productPrice);
                }else{
                    addTotal(productName);
                }
            
            // 结账按钮显示
            showCheckoutBtn();
        
            // 删除克隆的商品对象
            cloneProduct.remove();
            
            // 将已选商品本地存储
            saveProductToLocalStorage();
        })

        // 判断是否有相同的商品，如果没有则加上，如果有则数量加1  
        //  var cartName = $('#cart').find('.cart-item span.name').text();      
        //  if(cartName == productName ) {
        //      addTotal(productName);
        //      cloneProduct.animate().fadeOut().remove();
        //  }else {
        //      cloneProduct.animate().fadeOut();
        //  } 
        
        // $('#cart').find('.cart-item').each(function(i, target){
        //     var cartName = $(target).find('span.name').text();
        //     var total = $(target).find('span.total');
        //     var productTotal = parseInt(total.text()); 
        //     if(cartName == productName) {
        //         total.text(parseInt(productTotal + 1));
        //         cloneProduct.animate().fadeOut().remove();
        //     }else {
        //         cloneProduct.animate().fadeOut();
        //     }
        // })
    })
}

// 3.5 判断是否加入相同的商品，如果是相同商品 total做加法
  function addTotal(productName) {
     
    $('#cart').find('.cart-item').each(function(i, target){
         var total = $(target).find('span.total');
         var productTotal = parseInt(total.text()); 
         var cartName = $(target).find('span.name').text();
         if(cartName == productName) {   
             total.text(parseInt(productTotal + 1));        
         }
        
    })
 }

// 3.4.1 将选择商品添加到购物车列表
function addProductToCart(productImage, productName, productPrice) {
    var productItem = 
    '<div class="cart-item">'+
    '<div class="img-wrap">'+
    '<img src="'+ productImage +'" alt="">'+'</div>'+
    '<div class="box">' + 
    '<span class="name">'+ productName +'</span>' +
    '<span class="total">'+ 1 +'</span>' + '</div>' +
    '<strong class="price">'+ productPrice +'</strong>';
    $('#cart').append($(productItem));
}

// 4 结账按钮显示
function showCheckoutBtn() {
    if(!$('#checkout').is(':visible')){
        $('#checkout').fadeIn(500);

         // 购物车没有物品 隐藏
         $('#cart').find('.empty').hide();
    }
}

// 5 实现已选商品的本地存储
function saveProductToLocalStorage() {
    // 5.1 循环遍历购物车中商品cart-item，得到商品的image,price,name
    var productData = [];
    $('#cart').find('.cart-item').each(function(i, target){
        productData.push({
            image:$(target).find('img').attr('src'),
            name:$(target).find('span.name').text(),
            price:$(target).find('strong').text(),
            total:$(target).find('span.total').text()
        });
    });
    console.log(productData);
    // 将商品数组转化成JSON,保存在本地
    localStorage.setItem('products', JSON.stringify(productData));
}

// 6 实现从本地加载商品数据到购物车
function loadProductLocalStorage() {
    // 从本地获得到了商品数据
    var productJson = localStorage.getItem('products');
    
    if(productJson !== '' && productJson !== null && productJson !== undefined){
        var products = JSON.parse(productJson);
        $.each(products, function(i, v){
            var productItem = 
            '<div class="cart-item">'+
            '<div class="img-wrap">'+
            '<img src="'+ v.image +'" alt="">'+'</div>'+
            '<div class="box">' + 
            '<span class="name">'+ v.name +'</span>' +
            '<span class="total">'+ v.total +'</span>' + '</div>' +
            '<strong class="price">'+ v.price +'</strong>';
            // 将选择的商品添加到购物车列表
            $('#cart').append($(productItem));
        })
          // 结账按钮显示
          showCheckoutBtn();
          console.log(products);
    }
}



$(function(){
    productHoverEffect();
    switchProductLayout();
    handleAddProductToCart();
    loadProductLocalStorage();
})