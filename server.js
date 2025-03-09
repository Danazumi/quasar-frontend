import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { dirname } from 'path';
import history from 'connect-history-api-fallback';

// Get current file directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Handle SPA history mode
app.use(history());

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/spa')));

// Start server
const server = createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});