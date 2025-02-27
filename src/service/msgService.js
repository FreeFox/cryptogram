const Koa = require('koa');
const cors = require('@koa/cors');
const fs = require('fs');
const path = require('path');
const app = new Koa();
const port = 1337;

// Function to read messages from the file
const getMessages = () => {
  try {
    const filePath = path.resolve(__dirname, 'messages.txt');
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').filter(line => line.trim() !== '');
  } catch (err) {
    console.error('Error reading messages file:', err);
    return [];
  }
};

app.use(cors()); // Enable CORS

// Middleware to handle requests
app.use(async ctx => {
  const messages = getMessages();
  if (messages.length === 0) {
    ctx.status = 500;
    ctx.body = { error: 'No messages available' };
    return;
  }
  const randomIndex = Math.floor(Math.random() * messages.length);
  ctx.body = { message: messages[randomIndex].toUpperCase() };
});

// Start the HTTP server
app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});