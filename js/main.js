let cart = {}; // корзина
function init() {
  //вычитуем файл goods.json
  $.getJSON("../goods/goods.json", goodsOut);
  
}

function goodsOut(data) {
  // вывод товаров на страницу
  
  let out='';
  for (let key in data) {
     
      out +='<div class="productItem">';
      out +=`<img src="${data[key].img}" alt="">`;
      out +=`<p>${data[key].name}</p>`;
      out +=`<span>${data[key].brend}</span>`;
      out +=`<h3>${data[key].description}</h3>`;
      out +=`<div><span>${data[key].cost} грн</span>`;
      out +=`<button><img src="../images/heart.png" alt="heart" /></button>`;
      out +=`<button class="addToCart" data-id="${key}"><img src="../images/VectorCart.png" alt="shopping-bag" /></button>`;
      out +='</div></div>';
  }
  $('.goodsOut').html(out);
  $('.addToCart').on('click', addToCart);
  
}
function addToCart() {
  //добавляем товар в корзину
  let id = $(this).attr('data-id');
  // console.log(id);
  if (cart[id]==undefined) {
      cart[id] = 1; //если в корзине нет товара - делаем равным 1
  }
  else {
      cart[id]++; //если такой товар есть - увеличиваю на единицу
  }
  showMiniCart();
  saveCart();
}

function saveCart() {
  //сохраняю корзину в localStorage
  localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function showMiniCart(data) {
  //показываю мини корзину
  let out=0;
  let totalCost=0;
  for (let id in cart) {
    
      out +=cart[id];
      
  }
  $('.qtyGoodsInBag').html(out);
  $('.totalCost').html(totalCost);
  
}

function loadCart() {
  //проверяю есть ли в localStorage запись cart
  if (localStorage.getItem('cart')) {
      // если есть - расширфровываю и записываю в переменную cart
      cart = JSON.parse(localStorage.getItem('cart'));
      showMiniCart();
  }
}


//--------------------------------------------------------



$('a[href="#cart"]').on('click', showCart);




function showCart() {
  //вывод корзины
  if (!isEmpty(cart)) {
      $('#cart').html('Корзина пуста!');
  }
  else {
      $.getJSON('../goods/goods.json', function (data) {
          let goods = data;
          let out = '';
          for (let id in cart) {
              out += `<button data-id="${id}" class="del-goods">x</button>`;
              out += `<img src="${goods[id].img}">`;
              out += ` ${goods[id].name  }`;
              out += ` ${cart[id]  }`;
              out += '<br>';
          }
          $('.main-cart').html(out);
          $('.del-goods').on('click', delGoods);
      });
  }
}

function delGoods() {
  //удаляем товар из корзины
  let id = $(this).attr('data-id');
  delete cart[id];
  saveCart();
  showCart();
  showMiniCart();
}

function saveCart() {
  //сохраняю корзину в localStorage
  localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
  //проверка корзины на пустоту
  for (let key in object)
  if (object.hasOwnProperty(key)) return true;
  return false;
}




//------------------------------------------------------------








$(function() {
  /**
   * active link in nav
   */

  /*let pathname_url = window.location.pathname;
    let href_url = window.location.href;

    $("nav li").each(function () {

        let link = $(this).find("a").attr("href");

        if(pathname_url == link || href_url == link) {

            $(this).addClass("active");

        }

    });*/
    init();
    showMiniCart();
    loadCart();

  $("#popGoodsSlider").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
  });

  $("#bannersSlider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
 
  });

  $('a[rel*=leanModal]').leanModal({ top : 200, overlay : 0.4, closeButton: ".modal_close" });
  
});
