// Acción cuando se hace clic en el botón con clase 'btn'
$('.btn').click(function(){
    $(this).toggleClass("click"); // Agrega o quita la clase 'click' al botón
    $('.sidebar').toggleClass("show"); // Muestra u oculta la clase 'show' en el menú lateral
});

// Acción cuando se hace clic en el botón con clase 'Desing-btn'
$('.Desing-btn').click(function(){
    $('nav ul .Desing-show').toggleClass("show"); // Muestra u oculta la clase 'show' en el submenú de 'Concreto'
    $('nav ul .first').toggleClass("rotate"); // Gira o revierte la flecha del ícono 'Concreto'
});

// Acción cuando se hace clic en el botón con clase 'Config-btn'
$('.Config-btn').click(function(){
    $('nav ul .Config-show').toggleClass("show1"); // Muestra u oculta la clase 'show1' en el submenú de 'Acero'
    $('nav ul .second').toggleClass("rotate"); // Gira o revierte la flecha del ícono 'Acero'
});

// Acción cuando se hace clic en cualquier elemento <li> dentro de la navegación
$('nav ul li').click(function(){
    $(this).addClass("active").siblings().removeClass("active"); // Agrega la clase 'active' al elemento clicado y quita la clase 'active' a sus hermanos
});
