const express = require('express');

const apiRoutes = require('./api/apiRoutes');

const server = express();
server.use(express.json());


server.use('/api', apiRoutes);

server.listen(4000, () => console.log('API running on port 4000'));
