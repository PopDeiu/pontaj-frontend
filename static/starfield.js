const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.size = Math.random() * 1.5;
    }

    update() {
        this.z -= 5;
        if (this.z <= 0) {
            this.z = canvas.width;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        const x = (this.x - canvas.width / 2) * (canvas.width / this.z) + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * (canvas.width / this.z) + canvas.height / 2;
        const size = this.size * (canvas.width / this.z);
        const opacity = 1 - this.z / canvas.width;

        ctx.fillStyle = rgba(255, 255, 255, ${opacity});
        ctx.fillRect(x, y, size, size);
    }
}

function init() {
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        star.update();
        star.draw();
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();