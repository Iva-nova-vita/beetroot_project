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


    $('#popGoodsSlider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
      });
          
      $('#bannersSlider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
       // dots: true,
      });
});

