const express = require('express');
const connection = require('./database/db.js');
const PORT = process.env.PORT || 5000;

// Inicializations
const app = express();

// Middlewares
app.use(express.json());

// Routers
app.use(require('./routes/routes.js'));
app.use(express.static('../public'));

// Database
connection.connect(err => {
    if (err) throw err;
    console.log('Connected!');
});

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));