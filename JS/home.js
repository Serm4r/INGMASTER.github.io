$(document).ready(function() {
    var images = $('.carousel img');
    var currentIndex = 0;
  
    function showImage(index) {
      images.removeClass('active');
      images.eq(index).addClass('active');
    }
  
    function rotateImages() {
      showImage(currentIndex);
      currentIndex = (currentIndex + 1) % images.length;
    }
  
    setInterval(rotateImages, 3000); // cambia de imagen cada 3 segundos, ajusta el tiempo según tus necesidades
  });
  