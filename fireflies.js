document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('stars'); // Reutilizamos el canvas existente
    if (!canvas) {
        console.error("No se encontró el elemento canvas con id 'stars'.");
        return;
    }
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createFireflies(); // Volvemos a crear las luciérnagas si cambia el tamaño
    });

    let fireflies = [];
    const fireflyCount = 25; // Puedes aumentar o disminuir este número

    class Firefly {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() * 1 - 0.5); // Movimiento horizontal aleatorio
            this.speedY = (Math.random() * 1 - 0.5); // Movimiento vertical aleatorio
            this.opacity = Math.random() * 0.5 + 0.5;
            this.flickerSpeed = Math.random() * 0.02 + 0.01;
            this.flickerDirection = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Efecto de parpadeo (flicker)
            this.opacity += this.flickerSpeed * this.flickerDirection;
            if (this.opacity > 1 || this.opacity < 0.2) {
                this.flickerDirection *= -1;
            }

            // Si una luciérnaga sale de la pantalla, aparece por el otro lado
            if (this.x > width + this.size) this.x = -this.size;
            if (this.x < -this.size) this.x = width + this.size;
            if (this.y > height + this.size) this.y = -this.size;
            if (this.y < -this.size) this.y = height + this.size;
        }

        draw() {
            ctx.beginPath();
            // Usamos un gradiente radial para crear el efecto de brillo
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
            gradient.addColorStop(0, `rgba(255, 255, 150, ${this.opacity})`); // Centro amarillo brillante
            gradient.addColorStop(1, 'rgba(255, 255, 150, 0)'); // Se desvanece hacia afuera

            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createFireflies() {
        fireflies = [];
        for (let i = 0; i < fireflyCount; i++) {
            fireflies.push(new Firefly());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        fireflies.forEach(firefly => {
            firefly.update();
            firefly.draw();
        });
        requestAnimationFrame(animate);
    }

    createFireflies();
    animate();
});