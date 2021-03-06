// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('./custom_module/socket/reminder_cron');

// Create a new express application named 'app'
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

const io = socketIo(server, {'transports': ['websocket', 'polling']});
// load socket.js and pass it the socket.io object
const socketEmit = require('./custom_module/socket/socket');
socketEmit.connectSocket(io);
// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

// Require Route
const api = require('./routes/routes');
// Configure app to use route
app.use('/api/v1/', api);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
server.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
