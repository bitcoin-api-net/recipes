const WS_URL = import.meta.env.VITE_WS_API_BROWSER_URL || 'wss://api.bitcoin-api.net/api';
const API_KEY = import.meta.env.VITE_BITCOIN_API_KEY;

console.log('Connecting to WebSocket:', WS_URL);

const priceNumber = document.getElementById('price-number');
const priceDisplay = document.getElementById('price-display');
const loadingSkeleton = document.getElementById('loading-skeleton');
const errorMessage = document.getElementById('error-message');
const statusDot = document.getElementById('status-dot');
const connectionUrlDisplay = document.getElementById('connection-url');

let socket;
let reconnectTimer;

function connect() {
    const url = new URL(`${WS_URL}/v1/prices/current`);
    url.searchParams.set('symbol', 'btcusdt');
    if (API_KEY) {
        url.searchParams.set('apiKey', API_KEY);
    }
    const fullUrl = url.toString();
    console.log('Opening connection to:', fullUrl);
    if (connectionUrlDisplay) connectionUrlDisplay.textContent = `Live: ${WS_URL.replace(/^wss?:\/\//, '')}`;

    // Reset UI state
    loadingSkeleton.style.display = 'block';
    priceDisplay.style.display = 'none';
    errorMessage.style.display = 'none';
    statusDot.classList.add('is-loading');
    statusDot.classList.remove('is-offline');

    socket = new WebSocket(fullUrl);

    socket.onopen = () => {
        console.log('Connected to Bitcoin API WebSocket');
        statusDot.classList.remove('is-loading');
        statusDot.classList.remove('is-offline');
        clearTimeout(reconnectTimer);
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            // Update UI with new price
            priceNumber.textContent = parseFloat(data.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            loadingSkeleton.style.display = 'none';
            priceDisplay.style.display = 'flex';
            errorMessage.style.display = 'none';
        } catch (err) {
            console.error('Error parsing WebSocket message:', err);
        }
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed. Retrying in 5s...');
        statusDot.classList.add('is-offline');
        statusDot.classList.remove('is-loading');

        // Show error message if we don't have a price yet
        if (priceDisplay.style.display === 'none') {
            loadingSkeleton.style.display = 'none';
            errorMessage.style.display = 'block';
        }

        // Automatic reconnection
        reconnectTimer = setTimeout(connect, 5000);
    };

    socket.onerror = (err) => {
        console.error('WebSocket error:', err);
        socket.close();
    };
}

// Start connection
connect();
