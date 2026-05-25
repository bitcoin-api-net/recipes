# Real-time Bitcoin Price Recipe (WebSockets)

A framework-agnostic dashboard card showing the real-time Bitcoin price updated via WebSockets from the [Bitcoin API](https://bitcoin-api.net).

This recipe demonstrates:
- Connecting to a public WebSocket endpoint.
- Handling real-time data updates in the UI.
- Managing connection states (connecting, online, offline).
- Implementing automatic reconnection logic.

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

By default, the recipe uses `wss://bitcoin-api.net/api`. To use a different WebSocket URL, set the `VITE_WS_API_BROWSER_URL` environment variable:

```bash
VITE_WS_API_BROWSER_URL=wss://api.your-custom-domain.com npm run dev
```

## Structure

- `index.html`: Entry point and UI structure.
- `src/main.js`: WebSocket connection logic and UI updates.
- `src/style.css`: Dashboard card styling with connection state indicators.
