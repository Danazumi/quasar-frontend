import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { dirname } from 'path';
import history from 'connect-history-api-fallback';
import fs from 'fs';

// Get current file directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Check if PWA build exists, otherwise fallback to SPA
const pwaPath = path.join(__dirname, 'dist/pwa');
const spaPath = path.join(__dirname, 'dist/spa');

let staticPath = spaPath;
if (fs.existsSync(pwaPath)) {
  staticPath = pwaPath;
  console.log('PWA build detected, serving PWA version');
} else {
  console.log('No PWA build detected, serving SPA version');
}

// Handle SPA history mode
app.use(history());

// Serve static files from the appropriate directory
app.use(express.static(staticPath));

// Start server
const server = createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port} serving from: ${staticPath}`);
});