const express = require('express');
const app = express();
const logger = require('./middleware/logger');
app.use(express.json());
app.use(logger);
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

app.get('/', (req, res) => {
  res.json({ msg: 'Pocket Library API is up' });
});

app.listen(3000, () =>
  console.log('Server running on http://localhost:3000')
);
