// Funzione per l'animazione del punteggio
function animateScore(finalScore) {
    const scoreElement = document.getElementById('legalScoreValue');
    const duration = 2000;
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        scoreElement.textContent = Math.floor(progress * finalScore);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Funzione per animare il cerchio del punteggio
function drawScoreCircle() {
    const canvas = document.getElementById('score-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const finalScore = parseInt(document.getElementById('legalScoreValue').dataset.finalScore, 10);
    const radius = canvas.width / 2 - 10;
    const endAngle = (2 * Math.PI) * (finalScore / 100);

    let currentAngle = 0;
    const animationDuration = 2000;
    let startTimestamp = null;

    function animate(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
        const angle = progress * endAngle;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Disegna il cerchio di sfondo
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.lineWidth = 15;
        ctx.strokeStyle = '#e0e0e0';
        ctx.stroke();

        // Disegna il cerchio del punteggio
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, -Math.PI / 2, -Math.PI / 2 + angle);
        ctx.lineWidth = 15;
        ctx.strokeStyle = '#3b5998';
        ctx.stroke();

        if (progress < 1) {
            window.requestAnimationFrame(animate);
        }
    }
    window.requestAnimationFrame(animate);
}

// Funzione per animare la blockchain
function animateBlockchain() {
    const container = document.querySelector('.blockchain-animation');
    const nodesData = [
        { icon: '🌱', label: 'Origine' },
        { icon: '🏭', label: 'Lavorazione' },
        { icon: '📦', label: 'Logistica' },
        { icon: '🏛️', label: 'Certificazione' }
    ];

    nodesData.forEach((nodeData, index) => {
        const node = document.createElement('div');
        node.className = 'blockchain-node';
        node.innerHTML = `<div class="icon">${nodeData.icon}</div><p>${nodeData.label}</p>`;
        
        container.appendChild(node);
        if (index < nodesData.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'blockchain-arrow';
            arrow.innerHTML = '&#8594;';
            container.appendChild(arrow);
        }

        setTimeout(() => {
            node.classList.add('active');
        }, index * 500); // Ritardo per l'animazione in sequenza
    });
}

// Funzione per il grafico dell'AI (migliorato)
function drawRiskChart() {
    const ctx = document.getElementById('riskChart').getContext('2d');
    const riskChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Basso Rischio', 'Rischio Medio', 'Alto Rischio'],
            datasets: [{
                data: [75, 23, 2],
                backgroundColor: ['#4bc0c0', '#ffcd56', '#ff6384'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            plugins: {
                legend: { display: false }
            },
            cutout: '80%',
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
}

// Lanciare le animazioni all'intersezione con l'Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'score') {
                animateScore(95);
                drawScoreCircle();
            } else if (entry.target.id === 'blockchain') {
                animateBlockchain();
            } else if (entry.target.id === 'ai') {
                drawRiskChart();
            }
            observer.unobserve(entry.target); // Ferma l'osservazione
        }
    });
}, { threshold: 0.5 }); // Avvia l'animazione quando l'elemento è visibile per il 50%

document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.getElementById('score'));
    observer.observe(document.getElementById('blockchain'));
    observer.observe(document.getElementById('ai'));
});
