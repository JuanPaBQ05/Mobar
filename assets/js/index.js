document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre del archivo actual
    const currentPage = window.location.pathname.split('/').pop();

    // Seleccionar todos los nav-links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Obtener el atributo href de cada enlace
        const href = link.getAttribute('href');

        // Comparar con la página actual
        if (href === currentPage) {
            // Agregar la clase "active" al nav-link correspondiente
            link.classList.add('active');
        } else {
            // Remover la clase "active" de los otros enlaces
            link.classList.remove('active');
        }
    });
});



window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container')
            .classList.add('show');

    } else {
        document.querySelector('.go-top-container')
            .classList.remove('show');
    }


}


const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;

// Function to update the slider
function updateSlider(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    indicators[i].classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
      indicators[i].classList.add('active');
    }
  });
}

// Add click event listeners to indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentSlide = index;
    updateSlider(index);
  });
});

// Auto-slide every 5 seconds (optional)
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider(currentSlide);
}, 5000);