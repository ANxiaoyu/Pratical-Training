// 1 实现从本地加载页面
// 向左侧选择商品列表中添加商品
function appendProductToCart(productImage, productName, productPrice) {
    var productItem = '<li>'+'<img src="'+productImage+'" alt="">'+'<span class="shan">'+productName+'</span>'+'<span class="price">'+productPrice+'</span>';

    // 添加已经选择商品
    var cart_ul = document.getElementById('cart');
    $('#cart').append($(productItem));
}
// 从本地加载已选择的商品数据
function loadProductsLocalStorage() {
    var productsJson = localStorage.getItem('products');
    console.log(productsJson);
    var products = [];
    
    if(productsJson !== '' && productsJson !== null && productsJson !== undefined) {
        products = JSON.parse(productsJson);
        showCheckoutBtn();

        $.each(products, function(i, v) {
            appendProductToCart(v.image, v.name, v.price);
        });
    }
}

