document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}
document.addEventListener('keydown', function(event) {
    let lists = document.querySelectorAll('.item');
    if (event.key === 'ArrowRight') {
        // Flecha derecha, muestra la siguiente imagen
        document.getElementById('slide').appendChild(lists[0]);
    } else if (event.key === 'ArrowLeft') {
        // Flecha izquierda, muestra la imagen anterior
        document.getElementById('slide').prepend(lists[lists.length - 1]);
    }
});
document.addEventListener('wheel', function(event) {
    let lists = document.querySelectorAll('.item');
    if (event.deltaY > 0) {
        // Rueda hacia abajo, muestra la siguiente imagen
        document.getElementById('slide').appendChild(lists[0]);
    } else if (event.deltaY < 0) {
        // Rueda hacia arriba, muestra la imagen anterior
        document.getElementById('slide').prepend(lists[lists.length - 1]);
    }
});
