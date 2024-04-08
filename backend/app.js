const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routes/project');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const { DB_URL } = require('./utils/config');
const { notFound, sendError } = require('./controllers/error');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/project', projectRoutes);

// error routes
app.use(notFound);
app.use(sendError);

mongoose
   .connect(DB_URL)
   .then(() => {
      app.listen(8000, () => {
         console.log('Server running on port 8000');
      });
   })
   .catch(err => console.log(err));
