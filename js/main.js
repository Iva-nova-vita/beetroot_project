let cart = {}; 
function init() {
  $.getJSON("../goods/goods.json", goodsOut);
}
function goodsOut(data) {
  let id = 0;
  let out = "";
  for (let key in data) {
    id = `${data[key].category}`;
    out += '<div class="productItem">';
    out += `<img src="${data[key].img}" alt="">`;
    out += `<p>${data[key].name}</p>`;
    out += `<span>${data[key].brend}</span>`;
    out += `<h3>${data[key].description}</h3>`;
    out += `<div><span>${data[key].cost} грн</span>`;
    out += `<button><img src="../images/heart.png" alt="heart" /></button>`;
    out += `<button class="addToCart" data-id="${key}"><img src="../images/VectorCart.png" alt="shopping-bag" /></button>`;
    out += "</div></div>";
    $(`#category${id}`).append(out);
    out = "";
  }
  $(".addToCart").on("click", addToCart);
}
function addToCart() {
  let id = $(this).attr("data-id");
  if (cart[id] == undefined) {
    cart[id] = 1;
  } else {
    cart[id]++;
  }
  showMiniCart();
  saveCart();
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart)); 
}
function showMiniCart(data) {
  $.getJSON("../goods/goods.json", function(data) {
    let goods = data;
    let totalCost = 0;
    let out = 0;
    for (let id in cart) {
      out += cart[id];
      totalCost += cart[id] * goods[id].cost;
    }
    $(".qtyGoodsInBag").html(out);
    $(".totalCost").html(totalCost);
  });
}
function loadCart() {
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    showMiniCart();
  }
}
$('a[href="#cart"]').on("click", showCart);
function showCart() {
  if (!isEmpty(cart)) {
    $("#cart").html("Корзина пуста!");
  } else {
    $.getJSON("../goods/goods.json", function(data) {
      let goods = data;
      let totalCost = 0;
      let out = "";
      for (let id in cart) {
        out += '<div class="productItemInCart">';
        out += `<div><img src="${goods[id].img}" class="imgGoodsInCart"></div>`;
        out += ` <div class="description"><p>${goods[id].name} </p>`;
        out += ` <p class="cost">${goods[id].cost} грн</p>`;
        out += ` <span>${cart[id]}</span>`;
        out += `<button data-id="${id}" class="plusGoods">+</button>`;
        out += `<button data-id="${id}" class="minusGoods">-</button>`;
        out += `<button data-id="${id}" class="delGoods"></button>`;
        out += `<a href="#">Детали</a>`;
        out += "</div></div>";
        totalCost += cart[id] * goods[id].cost;
      }
      $(".mainCart").html(out);
      $(".totalCost").html(totalCost);
      $(".delGoods").on("click", delGoods);
      $(".plusGoods").on("click", plusGoods);
      $(".minusGoods").on("click", minusGoods);
    });
  }
}
function delGoods() {
  let id = $(this).attr("data-id");
  delete cart[id];
  saveCart();
  showCart();
  showMiniCart();
}
function plusGoods() {
  let id = $(this).attr("data-id");
  cart[id]++;
  saveCart();
  showCart();
  showMiniCart();
}
function minusGoods() {
  let id = $(this).attr("data-id");
  if (cart[id] == 1) {
    delete cart[id];
  } else {
    cart[id]--;
  }
  saveCart();
  showCart();
  showMiniCart();
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function isEmpty(object) {
  for (let key in object) if (object.hasOwnProperty(key)) return true;
  return false;
}
$(function() {
  init();
  showMiniCart();
  loadCart();
  $("#popGoodsSlider").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  });
  $("#bannersSlider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000
  });
  $("a[rel*=leanModal]").leanModal({
    top: 75,
    overlay: 0.4,
    closeButton: ".modal_close"
  });
});
