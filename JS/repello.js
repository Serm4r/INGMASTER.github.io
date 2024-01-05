document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.querySelector('.formContainer');
    
    function calcularRepello(area, grosor, dosificacion, tipoArena, tamañoMalla, desperdicio) {
        const volumen = (area * grosor) / 100; // Convertir grosor de cm a m
        
        let volumenArena = 0;
        if (tipoArena === 'coarse') {
            volumenArena = volumen * dosificacion;
        } else if (tipoArena === 'fine') {
            volumenArena = volumen * dosificacion * (1 - desperdicio / 100);
        } else if (tipoArena === 'both') {
            const volumenArenilla = volumen * dosificacion;
            volumenArena = volumenArenilla * (1 - desperdicio / 100);
            volumenArena += volumenArenilla * dosificacion * (1 - desperdicio / 100);
        }
    
        const bolsasCemento = volumenArena;
    
        return {
            bolsasCemento: bolsasCemento.toFixed(2),
            volumenArena: volumenArena.toFixed(2)
        };
    }
    
    function calcularYMostrarResultado(formulario) {
        const nombre = formulario.querySelector('#wallName').value;
        const area = formulario.querySelector('#area').value;
        const grosor = formulario.querySelector('#thickness').value;
        const dosificacion = formulario.querySelector('#dosage').value;
        const tipoArena = formulario.querySelector('#sandType').value;
        const tamañoMalla = formulario.querySelector('#meshSize').value;
        const desperdicio = formulario.querySelector('#waste').value;
    
        const resultado = calcularRepello(area, grosor, dosificacion, tipoArena, tamañoMalla, desperdicio);
        const resultDiv = formulario.querySelector('.result');
        resultDiv.textContent = `Para ${nombre}: ${resultado.bolsasCemento} bolsas de cemento y ${resultado.volumenArena} metros cúbicos de arena.`;
    }
    
    formContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('calculate')) {
            const formulario = event.target.parentElement;
            calcularYMostrarResultado(formulario);
        }
    
        if (event.target.classList.contains('addForm')) {
            const nuevoFormulario = document.querySelector('.calcForm').cloneNode(true);
            formContainer.insertBefore(nuevoFormulario, event.target);
        }
    
        if (event.target.classList.contains('copyAll')) {
            const resultados = formContainer.querySelectorAll('.result');
            let resultadosTexto = '';
            resultados.forEach(function(resultado, index) {
                resultadosTexto += `Para Pared ${index + 1}: ${resultado.textContent}\n`;
            });
            navigator.clipboard.writeText(resultadosTexto).then(function() {
                alert("Resultados copiados al portapapeles.");
            });
        }
    
        if (event.target.classList.contains('sumAll')) {
            const volumenes = formContainer.querySelectorAll('.result');
            let totalVolumen = 0;
            volumenes.forEach(function(volumen) {
                totalVolumen += parseFloat(volumen.textContent.split(' ')[5]);
            });
            alert(`Total de volumen de arena para todas las paredes: ${totalVolumen.toFixed(2)} metros cúbicos.`);
        }
    });
});
