function init() {
  //вычитуем файл goods.json
  $.getJSON("../goods/goods.json", goodsOut);
}

function goodsOut(data) {
  // вывод товаров на страницу
  console.log(data);
  let out='';
  for (let key in data) {
     
      out +='<div class="productItem">';
      out +=`<img src="../images/${data[key].img}" alt="">`;
      out +=`<p>${data[key].name}</p>`;
      out +=`<span>${data[key].brend}</span>`;
      out +=`<h3>${data[key].description}</h3>`;
      out +=`<div><span>${data[key].cost} грн</span>`;
      out +=`<button><img src="../images/heart.png" alt="heart" /></button>`;
      out +='<button class="addToCart"><img src="../images/VectorCart.png" alt="shopping-bag" /></button>';
      out +='</div></div>';
  }
  $('.goods-out').html(out);
}
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
