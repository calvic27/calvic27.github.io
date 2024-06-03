document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const prevButton = carousel.querySelector(".handlePrev");
        const nextButton = carousel.querySelector(".handleNext");
        const carouselInner = carousel.querySelector(".carousel-inner");
        const items = carouselInner.children;
        const index = carousel.getAttribute('data-index');
        const selectedItemDisplay = document.querySelector(`.selected-item-display[data-index="${index}"]`);
        const selectedImage = selectedItemDisplay.querySelector('.selected-image-img');
        const selectedDescription = selectedItemDisplay.querySelector('.selected-description-text');
        let currentIndex = 0;
        let isPaused = false;

        const updateCarousel = () => {
            const itemWidth = items[0].offsetWidth + 10; // Width + margin-right
            const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
            const maxIndex = items.length - visibleItems;
            if (currentIndex > maxIndex) {
                currentIndex = 0; // Reiniciar al primer elemento
            } else if (currentIndex < 0) {
                currentIndex = maxIndex; // Volver al último elemento
            }
            carouselInner.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
        };

        prevButton.addEventListener("click", () => {
            if (!isPaused) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextButton.addEventListener("click", () => {
            if (!isPaused) {
                currentIndex++;
                updateCarousel();
            }
        });

        Array.from(items).forEach(item => {
            item.addEventListener('mouseover', function() {
                const largeImageSrc = item.getAttribute('data-large-image');
                const description = item.getAttribute('data-description');
                selectedImage.src = largeImageSrc;
                selectedDescription.textContent = description;

                // Mostrar el contenedor de la imagen seleccionada
                selectedItemDisplay.classList.add('show');

                // Desplazar el navegador hacia el contenedor de la imagen seleccionada
                selectedItemDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        window.addEventListener("resize", updateCarousel);
        updateCarousel(); // Initial call to set the correct state
    });
});
