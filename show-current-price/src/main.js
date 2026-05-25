const BASE_URL = import.meta.env.VITE_API_BROWSER_URL || 'https://bitcoin-api.net/api';

const priceNumber = document.getElementById('price-number');
const priceDisplay = document.getElementById('price-display');
const loadingSkeleton = document.getElementById('loading-skeleton');
const errorMessage = document.getElementById('error-message');
const statusDot = document.getElementById('status-dot');
const refreshBtn = document.getElementById('refresh-btn');

async function fetchPrice() {
    try {
        // Show loading state
        loadingSkeleton.style.display = 'block';
        priceDisplay.style.display = 'none';
        errorMessage.style.display = 'none';
        statusDot.classList.add('is-loading');
        refreshBtn.disabled = true;

        const response = await fetch(`${BASE_URL}/v1/prices/current?symbol=btcusdt`);
        if (!response.ok) throw new Error('Failed to fetch price');

        const data = await response.json();

        // Update UI
        priceNumber.textContent = parseFloat(data.price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        loadingSkeleton.style.display = 'none';
        priceDisplay.style.display = 'flex';
    } catch (err) {
        console.error(err);
        loadingSkeleton.style.display = 'none';
        errorMessage.style.display = 'block';
    } finally {
        statusDot.classList.remove('is-loading');
        refreshBtn.disabled = false;
    }
}

refreshBtn.addEventListener('click', fetchPrice);

// Initial fetch
fetchPrice();
