document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DEL SOBRE ---
  // Esta línea inicia las animaciones CSS al eliminar la clase 'container',
  // que se usa en el CSS para pausar todas las animaciones inicialmente.
  document.body.classList.remove("container");

  const wrapper = document.querySelector(".wrapper");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const backgroundMusic = document.getElementById("background-music");

  // Es una buena práctica verificar si los elementos existen antes de agregarles eventos.
  if (wrapper && openBtn && closeBtn) {
    const toggleEnvelope = (isOpen) => {
      if (isOpen && backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().catch(error => {
          // El navegador puede bloquear la reproducción automática si no hay interacción previa.
          console.log("La reproducción de audio fue bloqueada por el navegador:", error);
        });
      }
      // Añade o quita la clase 'open' del sobre
      wrapper.classList.toggle("open", isOpen);
      // Muestra u oculta los botones correspondientes
      openBtn.style.display = isOpen ? "none" : "inline-block";
      closeBtn.style.display = isOpen ? "inline-block" : "none";
    };

    openBtn.addEventListener("click", () => toggleEnvelope(true));
    closeBtn.addEventListener("click", () => toggleEnvelope(false));

  } else {
    console.error("Error: No se pudieron encontrar los elementos del sobre para inicializar los botones.");
  }

  // --- LÓGICA DEL CARRUSEL 3D ---
  const carouselContainer = document.querySelector('.carousel-container');
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  // Verificar si los elementos del carrusel existen en la página actual
  if (carouselContainer && carousel && slides.length > 0 && prevBtn && nextBtn) {
    const slideCount = slides.length;
    const slideAngle = 360 / slideCount;
    const radius = Math.round((190 / 2) / Math.tan(Math.PI / slideCount));

    slides.forEach((slide, i) => {
        slide.style.transform = `rotateY(${i * slideAngle}deg) translateZ(${radius}px)`;
    });

    let currentRotation = 0;
    let autoRotateInterval;

    
    const rotateCarousel = () => {
        carousel.style.transform = `translateZ(-${radius}px) rotateY(${currentRotation}deg)`;
    };
    // y la animación continúa desde allí.
    const nextSlide = () => {
        currentRotation -= slideAngle;
        rotateCarousel();
    };

    const prevSlide = () => {
        currentRotation += slideAngle;
        rotateCarousel();
    };
    const startAutoRotate = () => {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(nextSlide, 3000);
    };

    const stopAutoRotate = () => {
        clearInterval(autoRotateInterval);
    };


    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    carouselContainer.addEventListener('mouseenter', stopAutoRotate);
    carouselContainer.addEventListener('mouseleave', startAutoRotate);

    // Iniciar la animación
    startAutoRotate();
  }
});