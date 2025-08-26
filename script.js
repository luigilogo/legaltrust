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

// Funzione per animare la blockchain con dati fittizi
function animateBlockchain() {
    const container = document.querySelector('.blockchain-animation');
    const nodesData = [
        { icon: '🍇', label: 'Origine: "Vigneto Siciliano"', data: 'ID Lutto: #F37A' },
        { icon: '🍷', label: 'Lavorazione: "Cantine Legali S.p.a."', data: 'Data: 15/08/2025' },
        { icon: '📦', label: 'Logistica: "Spedizioni Trasparenti Ltd."', data: 'Codice: A4F-98Y' },
        { icon: '🏛️', label: 'Certificazione: "LegalTrust"', data: 'Esito: Conforme' }
    ];

    nodesData.forEach((nodeData, index) => {
        const node = document.createElement('div');
        node.className = 'blockchain-node';
        node.innerHTML = `
            <div class="icon">${nodeData.icon}</div>
            <p>${nodeData.label}</p>
            <small>${nodeData.data}</small>
        `;
        
        container.appendChild(node);
        if (index < nodesData.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'blockchain-arrow';
            arrow.innerHTML = '&#8594;';
            container.appendChild(arrow);
        }

        setTimeout(() => {
            node.classList.add('active');
        }, index * 500);
    });
}

// Funzione per animare il grafico dell'IA e simulare l'analisi dei dati
function animateRiskAnalysis() {
    const ctx = document.getElementById('riskChart').getContext('2d');
    const riskData = [
        { label: 'Basso Rischio', value: 75, color: '#4bc0c0' },
        { label: 'Rischio Medio', value: 23, color: '#ffcd56' },
        { label: 'Alto Rischio', value: 2, color: '#ff6384' }
    ];

    const riskChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: riskData.map(d => d.label),
            datasets: [{
                data: riskData.map(d => d.value),
                backgroundColor: riskData.map(d => d.color),
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

    // Simulazione del dettaglio dell'analisi
    setTimeout(() => {
        const infoContainer = document.querySelector('.risk-info');
        infoContainer.innerHTML = `
            <h3>Analisi Approfondita</h3>
            <p>Il nostro algoritmo ha identificato <strong>2 fornitori</strong> ad alto rischio:</p>
            <ul class="risk-list">
                <li style="animation-delay: 0s;"><span class="risk-name">Fornitore Omega S.r.l.</span>: Collegamento a società offshore.</li>
                <li style="animation-delay: 0.2s;"><span class="risk-name">Logistica Beta Inc.</span>: Transazioni anomale con un'azienda sotto indagine per frode fiscale.</li>
            </ul>
        `;
    }, 2500);
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
                animateRiskAnalysis();
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.getElementById('score'));
    observer.observe(document.getElementById('blockchain'));
    observer.observe(document.getElementById('ai'));
});
