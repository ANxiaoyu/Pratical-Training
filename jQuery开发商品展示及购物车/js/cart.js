// 1 从本地存储中加载已经选择的商品，并初始化购物车
function initCartProductByLocalStorage() {
    // 从localStorage 获取商品数据
    var productsJson = localStorage.getItem('products');
   
    if(productsJson !== '' && productsJson !== null && productsJson !== undefined) {
        // 将JSON形式数据，转换成JS数组
        var products = JSON.parse(productsJson);
    }
}



var cartBody = $('')