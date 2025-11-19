require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
// Offline mode: no blockchain formatting needed

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

async function testConnection() {
  console.log('Offline mode: blockchain connectivity disabled.');
  return true;
}

// API Routes
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({ message: 'Game API is running' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health endpoint accessed');
  res.json({ status: 'ok' });
});

// Token and balance endpoints removed (offline mode)

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Removed blockchain-related routes: /token-info, /symbol, /totalSupply, /balance

// Remove the first claim-rewards endpoint (around line 150-200)
// and keep only the one that uses the playerPointsDB

// Make sure these routes are defined BEFORE the catch-all route
// Database mock - in production, use a real database
const playerPointsDB = {};

// Add points endpoint
app.post('/add-points', async (req, res) => {
  console.log('Add points endpoint accessed');
  try {
    const { playerAddress, pointsToAdd } = req.body;
    
    if (!playerAddress || !pointsToAdd) {
      return res.status(400).json({ success: false, error: "Player id and points are required" });
    }
    if (typeof playerAddress !== 'string' || playerAddress.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Invalid player identifier" });
    }
    
    // Validate points
    if (isNaN(pointsToAdd) || pointsToAdd <= 0) {
      return res.status(400).json({ 
        success: false, 
        error: "Points must be a positive number" 
      });
    }
    
    console.log(`Adding ${pointsToAdd} points for address: ${playerAddress}`);
    
    // Get current points (or initialize to 0)
    const currentPoints = playerPointsDB[playerAddress] || 0;
    
    // Add points
    playerPointsDB[playerAddress] = currentPoints + parseInt(pointsToAdd);
    
    res.json({ 
      success: true, 
      newTotalPoints: playerPointsDB[playerAddress]
    });
  } catch (error) {
    console.error('Error adding points:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to add points" 
    });
  }
});

// Get points endpoint
app.get('/get-points/:address', async (req, res) => {
  console.log('Get points endpoint accessed');
  try {
    const address = req.params.address;
    if (!address) {
      return res.status(400).json({ success: false, error: "Player id parameter is required" });
    }
    if (typeof address !== 'string' || address.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Invalid player identifier" });
    }
    
    console.log(`Fetching points for address: ${address}`);
    
    // Get current points (or return 0)
    const points = playerPointsDB[address] || 0;
    
    res.json({ 
      success: true, 
      points
    });
  } catch (error) {
    console.error('Error getting points:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to get points" 
    });
  }
});

// Removed claim-rewards endpoint

// THEN add the catch-all route
app.use((req, res) => {
  console.log(`Attempted to access undefined route: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Start server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, async () => {
  console.log(`API running on port ${PORT}`);
  console.log(`Server is listening at http://localhost:${PORT}`);
  await testConnection();
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
