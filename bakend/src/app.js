const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const app = express();



app.use(cors({
  origin: 'http://localhost:5173',  // ✅ Frontend ka exact origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());



app.get('/', (req, res) => {
  res.send('hello wrold')
})

app.use('/ai', aiRoutes);
module.exports = app;