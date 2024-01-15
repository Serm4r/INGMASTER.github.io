// Obtén el elemento de selección del tipo de bloque
const tipoBloqueSelect = document.getElementById("tipoBloque");
// Obtén las imágenes por sus IDs
const imagenBloqueSolido = document.getElementById("imagenBloqueSolido");
const imagenBloqueHueco = document.getElementById("imagenBloqueHueco");

// Agrega un evento de cambio al elemento de selección
tipoBloqueSelect.addEventListener("change", function () {
  // Verifica el valor del tipo de bloque seleccionado
  if (tipoBloqueSelect.value === "solido") {
    // Si es sólido, muestra la imagen del bloque sólido y oculta la del bloque hueco
    imagenBloqueSolido.style.display = "block";
    imagenBloqueHueco.style.display = "none";
  } else if (tipoBloqueSelect.value === "hueco") {
    // Si es hueco, muestra la imagen del bloque hueco y oculta la del bloque sólido
    imagenBloqueSolido.style.display = "none";
    imagenBloqueHueco.style.display = "block";
  } else {
    // Si no es ninguno de los dos, oculta ambas imágenes
    imagenBloqueSolido.style.display = "none";
    imagenBloqueHueco.style.display = "none";
  }
});

let area = 0;
function mostrarCampos() {
  const tipoBloque = document.getElementById("tipoBloque").value;
  const camposHueco = document.getElementById("camposHueco");

  // Limpiar campos de bloque hueco al seleccionar bloque sólido
  if (tipoBloque === "solido") {
    document.getElementById("anchoHueco").value = "0";
    document.getElementById("largoHueco").value = "0";
    document.getElementById("cantidadHuecos").value = "0";
  }

  // Mostrar u ocultar campos de hueco según el tipo de bloque seleccionado
  camposHueco.style.display = tipoBloque === "hueco" ? "block" : "none";

  // Llama a la función calcularCantidad para actualizar los resultados según el tipo de bloque seleccionado
  calcularCantidad();
}

//calcular la cantidad de bloques y dibujar la pared
function calcularCantidad() {
  const altoPared = parseFloat(document.getElementById("altoPared").value);
  const anchoPared = parseFloat(document.getElementById("anchoPared").value);
  const alturaTecho = parseFloat(document.getElementById("alturaTecho").value);
  const altoBloque = parseFloat(document.getElementById("altoBloque").value);
  const anchoBloque = parseFloat(document.getElementById("anchoBloque").value);
  const largoBloque = parseFloat(document.getElementById("largoBloque").value);
  const selectProporcionJunta = document.getElementById("proporcionJunta");
  const espesorJuntaH = parseFloat(document.getElementById("espesorJuntaH").value);
  const espesorJuntaV = parseFloat(document.getElementById("espesorJuntaV").value);
  const precioBloque = parseFloat(document.getElementById("precioBloque").value);
  const desperdicioPorcentaje = parseFloat(document.getElementById("desperdicio").value);
  const precioCemento = parseFloat(document.getElementById("precioCemento").value);
  const precioArena = parseFloat(document.getElementById("precioArena").value);
  const cantidadParedes = parseFloat(document.getElementById("cantidadParedes").value) || 1; // Si el usuario no ingresa nada, se asume 1 pared
  let anchoHueco = parseFloat(document.getElementById("anchoHueco").value);
  let largoHueco = parseFloat(document.getElementById("largoHueco").value);
  let cantidadHuecos = parseInt(document.getElementById("cantidadHuecos").value) || 0;
  const areaRestada = parseFloat(document.getElementById("areaRestada").value) || 0;
  let  areaHuecos = cantidadHuecos * (anchoHueco / 100 * largoHueco / 100);
  const volumenBloque = (altoBloque / 100) * (anchoBloque / 100 * largoBloque / 100);
   const areaTriangulo = (1 / 2) * anchoPared * alturaTecho;
  const areaPared = ((altoPared * anchoPared) + areaTriangulo) - areaRestada;
  const juntaH = ((espesorJuntaH / 100));
  const juntaV = ((espesorJuntaV / 100));
  let cantidad = Math.ceil(areaPared / (((largoBloque / 100) + juntaH) * ((altoBloque / 100) + juntaV)) + 1); // "cantidad" se refiere a la cantidad de bloques
  area = areaPared;
  let volumenmortero = 0;
  const volumenpared = areaPared * ((anchoBloque / 100));
  
  // Aumentar la cantidad de bloques según el desperdicio
  const desperdicio = Math.ceil(cantidad * (desperdicioPorcentaje / 100));
  const cantidadBloques = cantidad + desperdicio;

  if (cantidadHuecos > 0) {
    // Si hay huecos
  
 const MORTERO= cantidadParedes * (volumenpared - (cantidad * volumenBloque));
    volumenmortero=  MORTERO - (cantidadParedes * cantidad * areaHuecos * juntaV) ;
  } else {
    // Calcular la proporción de cemento y arena para bloque sólido
    volumenmortero = cantidadParedes * (volumenpared - (cantidad * volumenBloque));
  }

  const valorSeleccionado = selectProporcionJunta.value;
  const valores = valorSeleccionado.split(",");
  const proporcionCemento = parseFloat(valores[0]);
  const proporcionArena = parseFloat(valores[1]);

  const volumenCemento = Math.ceil(volumenmortero * (proporcionCemento / 42.5) + 1.5); //tomando en cuenta que las bolsas de cemento son de 42.5kg 
  const volumenArena = volumenmortero * proporcionArena ;
  // Calcular el precio del cemento y arena
  const precioCementoTotal = Math.ceil(volumenCemento) * precioCemento; // Redondea hacia arriba
  const precioArenaTotal =  Math.ceil(volumenArena * precioArena);

  // Calcular el precio total
  const precioTotal = cantidad * precioBloque + precioCementoTotal + precioArenaTotal;
const bloquestotales= cantidadBloques*cantidadParedes
  // Actualizar los resultados en el HTML

  document.getElementById("cantidadResultado").textContent = bloquestotales; //cantidad de bloques
  document.getElementById("cantidadCemento").textContent = (volumenCemento) + " bolsas"; // Redondear hacia arriba la cantidad de bolsas de cemento
  document.getElementById("preciobloque").textContent = "C$ " + precioBloque * cantidad.toFixed(2);
  document.getElementById("cantidadArena").textContent = volumenArena.toFixed(2) + " metros cúbicos";
  document.getElementById("preciocemento").textContent = "C$" + precioCementoTotal.toFixed(2);
  document.getElementById("precioarena").textContent = "C$" + precioArenaTotal.toFixed(2);
  document.getElementById("precioTotal").textContent = "C$" + precioTotal.toFixed(2);

  // Dibuja la pared en el canvas
  const canvas = document.getElementById("paredDibujo");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

  // Configura el color de la línea y el texto como cian
  context.strokeStyle = "cyan";
  context.fillStyle = "cyan";

  // Dibuja el contorno del rectángulo escalado
  
context.strokeRect(10, 350 , anchoPared * 50, altoPared * 50);

// Dibuja el triángulo encima del rectángulo
context.beginPath();
context.moveTo(10, 350);  // Punto superior izquierdo del rectángulo
context.lineTo(10 + anchoPared * 50, 350);  // Punto superior derecho del rectángulo
context.lineTo(10 + anchoPared * 25, 350 - alturaTecho * 50);  // Punto inferior del triángulo
context.closePath();
context.fill();

  // Dibuja el texto del área con "m²" como exponente centrado en el rectángulo
  const areaText = `Área: ${areaPared.toFixed(2)} m²`;
  const textWidth = context.measureText(areaText).width; // Obtiene el ancho del texto
  
  const x = 10 + (anchoPared * 50 - textWidth) / 2; // Calcula la coordenada x centrada
  const y = 350 + (altoPared * 50 ) /2; // Calcula la coordenada y centrada

  context.font = "20px Arial"; // Estilo del texto
  context.fillText(areaText, x, y);
}


// Llama a la función calcularCantidad() al cargar la página y cada vez que se modifiquen los campos de entrada
document.addEventListener("DOMContentLoaded", function () {
  calcularCantidad(); // Calcula inicialmente al cargar la página
  const inputElements = document.querySelectorAll(
    "input[type='number'], select"
  );

  inputElements.forEach(function (input) {
    input.addEventListener("input", calcularCantidad); // Calcula cuando cambian los valores
  });
});

// Obtén todos los campos de entrada de texto
const inputElements = document.querySelectorAll('input[type="number"], select');

// Agrega un evento de escucha a cada campo de entrada
inputElements.forEach((input, index, inputs) => {
  input.addEventListener("keydown", function (event) {
    // Verifica si la tecla presionada es "Enter" (código de tecla 13)
    if (event.keyCode === 13) {
      event.preventDefault(); // Evita el comportamiento predeterminado (como enviar el formulario)

      // Mueve el enfoque al siguiente campo de entrada si existe
      const nextInput = inputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});

// Función para copiar los resultados al portapapeles

function copiarResultados() {
  // Obtiene los elementos que deseas copiar
  const nombrePared = document.getElementById("nombrePared").value;
  const cantidadResultado = document.getElementById("cantidadResultado").textContent;
  const cantidadCemento = document.getElementById("cantidadCemento").textContent;
  const cantidadArena = document.getElementById("cantidadArena").textContent;
  const precioBloque = document.getElementById("preciobloque").textContent;
  const preciocemento = document.getElementById("preciocemento").textContent;
  const precioarena = document.getElementById("precioarena").textContent;
  const precioTotal = document.getElementById("precioTotal").textContent;

  // Une los resultados en un formato legible
  const resultadosTexto = `
    Pared: ${nombrePared}
    Área de la Pared: ${area} m²
    Cantidad de Bloques: ${cantidadResultado}
    Cantidad de Cemento: ${cantidadCemento}
    Cantidad de Arena: ${cantidadArena}
    Costo de Bloque: ${precioBloque}
    Costo de Cemento: ${preciocemento}
    Costo de Arena: ${precioarena}
    Precio Total: ${precioTotal}
  `;

  // Crea un elemento de texto oculto para copiar
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = resultadosTexto;
  document.body.appendChild(tempTextArea);

  // Selecciona y copia el texto al portapapeles
  tempTextArea.select();
  document.execCommand("copy");

  // Limpia y elimina el elemento temporal
  document.body.removeChild(tempTextArea);

  // Puedes mostrar un mensaje de éxito o realizar otras acciones después de copiar
  alert("Resultados copiados al Portapapeles");
}

// Agrega un evento clic al botón de copiar
document
  .getElementById("copiarResultados")
  .addEventListener("click", copiarResultados);









