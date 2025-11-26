// AI/Robotics Background Animation
class BackgroundAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 30 : 60;
        this.colors = ['#64ffda', '#1e90ff', '#ff4d4d', '#f0f0f0'];
        
        this.init();
    }

    init() {
        // Set canvas size
        this.resizeCanvas();
        
        // Create particles
        this.createParticles();
        
        // Start animation
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                angle: 0,
                angleSpeed: (Math.random() - 0.5) * 0.02,
                type: Math.random() > 0.5 ? 'circle' : 'square'
            });
        }
    }

    drawParticle(particle) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.angle);
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = 0.8;
        
        if (particle.type === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            // Draw a small square or triangle for variety
            this.ctx.fillRect(
                -particle.size / 2,
                -particle.size / 2,
                particle.size,
                particle.size
            );
        }
        
        this.ctx.restore();
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.angle += particle.angleSpeed;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }
            
            // Random direction changes
            if (Math.random() > 0.98) {
                particle.speedX = (Math.random() - 0.5) * 0.5;
                particle.speedY = (Math.random() - 0.5) * 0.5;
            }
        });
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(100, 255, 218, ${1 - distance / 150})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.updateParticles();
        this.particles.forEach(particle => this.drawParticle(particle));
        this.drawConnections();
        
        // Continue animation loop
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the background animation when the page loads
window.addEventListener('load', () => {
    const background = new BackgroundAnimation();
    document.body.insertBefore(background.canvas, document.body.firstChild);
    background.canvas.style.position = 'fixed';
    background.canvas.style.top = '0';
    background.canvas.style.left = '0';
    background.canvas.style.zIndex = '-1';
    background.canvas.style.opacity = '0.2';
});
