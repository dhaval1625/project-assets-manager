const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routes/project');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URL } = require('./utils/config');
const { notFound, sendError } = require('./controllers/error');

const app = express();

// useful middlewares
app.use(cors());
app.use(bodyParser.json());

// main routes
app.use('/auth', authRoutes);
app.use('/project', projectRoutes);

// error routes
app.use(notFound);
app.use(sendError);

mongoose
   .connect(DB_URL)
   .then(() => {
      const port = process.env.PORT || 8000;
      app.listen(port, () => {
         console.log(`Server running on port ${port}`);
      });
   })
   .catch((err) => console.log(err));

module.exports = app;