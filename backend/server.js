const http = require('http');
const app = require('./app'); // Import the Express app
const port = process.env.PORT || 3000; // Set the port to listen on
const server = http.createServer(app); // Create an HTTP server with the Express app


server.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log the port number when the server starts
});