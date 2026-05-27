# Show Current Bitcoin Price Recipe

A simple, framework-agnostic dashboard card showing the real-time Bitcoin price fetched from the [Bitcoin API](https://bitcoin-api.net).

This recipe demonstrates:
- Fetching data from a public REST endpoint.
- Handling loading and error states in vanilla JavaScript.
- Basic styling with modern CSS.
- Using environment variables for API configuration.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Configuration

By default, the recipe uses `https://bitcoin-api.net/api`. To use a different API URL or provide an API key, set the environment variables in `.env` file (Same directory as this `README.md`):

```bash
# Optional: Custom API URL
VITE_API_BROWSER_URL=https://api.your-custom-domain.com

# Optional: Your Bitcoin API Key
VITE_BITCOIN_API_KEY=your_api_key_here
```

## Structure

- `index.html`: Entry point and UI structure.
- `src/main.js`: Fetching logic and UI updates.
- `src/style.css`: Dashboard card styling.
