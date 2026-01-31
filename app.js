const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/users', mainRouter);

app.get('/', (req, res) => {
  res.send('WTWR backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
