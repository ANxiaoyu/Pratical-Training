// 2 初始化商品结算页面
// 从localStorage 获取商品数据
var productsJson = localStorage.getItem('products');
var products = [];
if(productsJson !== '' && productsJson !== null && productsJson !== undefined) {
    // 将JSON形式数据，转换成JS数组
    products = JSON.parse(productsJson);
}

var cartBody = $('')