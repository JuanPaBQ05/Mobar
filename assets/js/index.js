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