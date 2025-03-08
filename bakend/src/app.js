const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const app = express();



app.use(cors({
  origin: '*', // Allows requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());



app.get('/', (req, res) => {
  res.send('hello wrold')
})

app.use('/ai', aiRoutes);
module.exports = app;
