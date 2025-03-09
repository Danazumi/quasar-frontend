const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const app = express();
const port = process.env.PORT || 3000;

// Handle SPA history mode
app.use(history());

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/spa')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});