document.addEventListener("DOMContentLoaded", () => {
    let leyes = [];
    let currentLeyIndex = 0;

    const leyImg = document.getElementById('ley-img');
    const leyTitulo = document.getElementById('ley-titulo');
    const leyDescripcion = document.getElementById('ley-descripcion');
    const nextBtn = document.getElementById('next-btn');
    const revealBtn = document.getElementById('reveal-btn');
    const loadBtn = document.getElementById('load-btn');
    const categoryForm = document.getElementById('category-form');

    const categoryMap = {
        'viales': './data/viales/viales.json',
        'transitorias': './data/transitorias/transitorias.json',
        'preventivas': './data/preventivas/preventivas.json',
        'restrictivas': './data/restrictivas/restrictivas.json',
        'informativas': './data/informativas/informativas.json'
    };

    // Cargar datos de los JSON seleccionados
    function cargarDatosSeleccionados() {
        leyes = [];
        const selectedCategories = Array.from(categoryForm.elements['category'])
            .filter(checkbox => checkbox.checked)
            .map(checkbox => categoryMap[checkbox.value]);

        if (selectedCategories.length === 0) {
            alert('Por favor, seleccione al menos una categoría.');
            return;
        }

        Promise.all(selectedCategories.map(url => fetch(url).then(response => response.json())))
            .then(dataArrays => {
                leyes = dataArrays.flat();
                mostrarLeyAleatoria();
                nextBtn.classList.remove('oculto');
                revealBtn.classList.remove('oculto');
            })
            .catch(error => console.error('Error al cargar los archivos JSON:', error));
    }

    // Mostrar una ley aleatoria
    function mostrarLeyAleatoria() {
        if (leyes.length === 0) return;
        currentLeyIndex = Math.floor(Math.random() * leyes.length);
        const ley = leyes[currentLeyIndex];
        leyImg.src = ley.img;
        leyTitulo.textContent = ley.titulo;
        leyDescripcion.textContent = ley.descripcion;
        ocultarDetalles();
    }

    // Ocultar título y descripción
    function ocultarDetalles() {
        leyTitulo.classList.add('oculto');
        leyDescripcion.classList.add('oculto');
    }

    // Revelar título y descripción
    function revelarDetalles() {
        leyTitulo.classList.remove('oculto');
        leyDescripcion.classList.remove('oculto');
    }

    // Eventos
    nextBtn.addEventListener('click', mostrarLeyAleatoria);
    revealBtn.addEventListener('click', revelarDetalles);
    loadBtn.addEventListener('click', cargarDatosSeleccionados);
});
