document.addEventListener('DOMContentLoaded', (event) => {
    // Carica i dati salvati o usa quelli iniziali
    loadData();
});

function loadData() {
    ['medA', 'medB'].forEach(medId => {
        let quantity = localStorage.getItem(medId + '-quantity');
        if (quantity === null) {
            // Se non ci sono dati, usa i valori iniziali dal DOM
            quantity = document.getElementById(medId + '-quantity').textContent;
            localStorage.setItem(medId + '-quantity', quantity);
        }
        document.getElementById(medId + '-quantity').textContent = quantity;
        checkAlert(medId);
    });
}

function decrementQuantity(medId) {
    let quantitySpan = document.getElementById(medId + '-quantity');
    let currentQuantity = parseInt(quantitySpan.textContent);

    if (currentQuantity > 0) {
        currentQuantity--;
        quantitySpan.textContent = currentQuantity;
        localStorage.setItem(medId + '-quantity', currentQuantity);
        checkAlert(medId);
    }
}

function checkAlert(medId) {
    let quantitySpan = document.getElementById(medId + '-quantity');
    let currentQuantity = parseInt(quantitySpan.textContent);
    let alertMessage = document.getElementById(medId + '-alert');

    // Soglia di avviso: 5 pillole
    if (currentQuantity <= 5) {
        alertMessage.textContent = "ATTENZIONE: Le scorte stanno per finire!";
    } else {
        alertMessage.textContent = "";
    }

    // Questo è il punto chiave per la Fase 3
    if (currentQuantity <= 5) {
        document.body.classList.add('low-stock');
    } else {
        document.body.classList.remove('low-stock');
    }
}
