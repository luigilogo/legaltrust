// Animazione del Punteggio Dinamico
document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('legalScore');
    const scoreValueElement = scoreElement.querySelector('.score-value');
    const finalScore = parseInt(scoreElement.dataset.score, 10);
    const duration = 2000; // 2 secondi
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        scoreValueElement.textContent = Math.floor(progress * finalScore);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
});

// Animazione della Blockchain
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Attiva quando il 50% dell'elemento è visibile
};

const blockchainObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nodes = entry.target.querySelectorAll('.block-node');
            let delay = 0;
            nodes.forEach((node, index) => {
                setTimeout(() => {
                    node.classList.add('active');
                }, delay);
                delay += 500;
            });
            observer.unobserve(entry.target); // Ferma l'osservazione dopo l'animazione
        }
    });
}, observerOptions);

const blockchainSection = document.getElementById('blockchain');
if (blockchainSection) {
    blockchainObserver.observe(blockchainSection);
}

// Grafico Interattivo per l'Analisi AI
const ctx = document.getElementById('riskChart').getContext('2d');
const riskChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Basso Rischio', 'Rischio Medio', 'Alto Rischio'],
        datasets: [{
            label: 'Distribuzione Rischio Fornitori',
            data: [75, 23, 2], // Dati fittizi: 75% Basso, 23% Medio, 2% Alto
            backgroundColor: [
                '#4bc0c0',
                '#ffcd56',
                '#ff6384'
            ],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Nasconde la legenda predefinita, usiamo quella HTML
            }
        },
        cutout: '80%',
        animation: {
            animateRotate: true,
            animateScale: true
        }
    }
});
