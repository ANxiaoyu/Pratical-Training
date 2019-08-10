// 7 从本地存储中加载已经选择的商品，并初始化购物车
function initCartProductByLocalStorage() {
    // 7.1 从localStorage 获取商品数据
    var productsJson = localStorage.getItem('products');

    // 获取购物车的tbody
    var cartBody = $('#cartTable tbody');
   
    if(productsJson !== '' && productsJson !== null && productsJson !== undefined) {
        // 将JSON形式数据，转换成JS数组
        var products = JSON.parse(productsJson);
        // 7.2 循环遍历获得的商品信息，并动态的加入到购物车上
        $.each(products, function(i, v){
            var productElm = 
            '<tr>'+
            '<td><input type="checkbox" name="productCheck"></td>'+
            '<td class="cart-product-name">'+'<img src="'+ v.image +'" alt="No Image">'+'<span>'+ v.name +'</span>'+'</td>'+
            '<td class="cart-product-price">'+ v.price +'</td>'+
            '<td class="cart-product-count">'+
                '<span class="reduce">-</span>'+
                '<input type="text" class="count-input" value="'+ v.total +'">'+
                '<span class="add">+</span>'+
            '</td>'+
            '<td class="cart-product-subtotal">'+ v.price +'</td>'+
           ' <td class="cart-product-operation">'+
               ' <span class="delete">删除</span>'+
            '</td>'+
        '</tr>';

        // 将动态创建的商品信息加入到tbody中
        cartBody.append(productElm);
        })

        // 8 计算商品金额小计
        // 8.1 给增加add按钮注册点击事件
        cartBody.on('click', '.add', function(){
            // 8.1.1 获取input里面的内容，做加法
            var input = $(this).prev();
            var inputValue = parseInt(input.val());
            input.val(inputValue+1);

            // 8.1.2 商品小计计算 找到同一行tr中的单价、数量、总价， 总价=单价*数量
            var cartBodyTr = $(this).parent().parent();
            // 商品单价
            var price = parseFloat(cartBodyTr.find('.cart-product-price').text());
            // 商品数量
            inputValue = cartBodyTr.find('.count-input').val();
            var productSubtotal = cartBodyTr.find('.cart-product-subtotal');
            productSubtotal.text(parseFloat(price * inputValue).toFixed());

            countProductTotalAmountAndTotalCount();
        })

        // 8.2 给减少reduce按钮注册点击事件
        cartBody.on('click', '.reduce', function(){
            // 8.2.1 获取input里面的内容，做减法
            var input = $(this).next();
            var inputValue = parseInt(input.val());
            inputValue = inputValue > 1 ? inputValue-1 : inputValue; 
            input.val(inputValue);

            // 8.2.2 商品小计计算 找到同一行tr中的单价、数量、总价， 总价=单价*数量
            var cartBodyTr = $(this).parent().parent();
            // 商品单价
            var price = parseFloat(cartBodyTr.find('.cart-product-price').text());
            // 商品数量
            inputValue = cartBodyTr.find('.count-input').val();
            var productSubtotal = cartBodyTr.find('.cart-product-subtotal');
            productSubtotal.text(parseFloat(price * inputValue).toFixed());

            countProductTotalAmountAndTotalCount();
        });

        // 9 计算商品总金额和总数量
        // 9.1 给选择按钮注册事件
        cartBody.on('click', 'input:checkbox', function(){
            countProductTotalAmountAndTotalCount();
        });
        // 9.2 给全选按钮注册事件
        $('#selectAllProduct').click(function(){
            // prop()设置属性
            var checkedAll = $(this).prop('checked');
            $('#cartTable tbody :checkbox').prop('checked', checkedAll);
            countProductTotalAmountAndTotalCount();
        });

        // 10 给删除按钮注册事件
        cartBody.on('click', '.delete', function(){
            var cartBodyTr = $(this).parent().parent();
            cartBodyTr.remove();

            countProductTotalAmountAndTotalCount();
        });
        // 10.1 删除所有商品
        $('#deleteAllProduct').click(function(){
            var result = confirm('是否删除所有商品？');
            if(result == true) {
                // 清空列表
               $('#cartTable tbody').empty();

               // 清除本地存储
               localStorage.removeItem('products');
               countProductTotalAmountAndTotalCount();
            }
        })
    }
}

// 9 计算选中商品的总金额和总数量
function countProductTotalAmountAndTotalCount(){
    var selectedTotalAmount = 0;
    var selectedTotalCount = 0;

    // 遍历所有选中的商品
    $('#cartTable tbody input:checkbox[name="productCheck"]:checked').each(function(i, v){
        var cartBodyTr = $(this).parent().parent();
        var productCount = cartBodyTr.find('.count-input').val();
        var productSubtotal = cartBodyTr.find('.cart-product-subtotal').text();
        selectedTotalCount += parseInt(productCount);
        selectedTotalAmount += parseFloat(productSubtotal);
    })

    // 设置商品总金额
    $('#selectedTotalAmount').text(selectedTotalAmount.toFixed(2));

    // 设置商品总数量
    $('#selectedTotalCount').text(selectedTotalCount);
}



$(function(){
    initCartProductByLocalStorage();
})