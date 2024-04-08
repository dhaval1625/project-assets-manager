const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routes/project');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const fs = require('fs');
const { DB_URL } = require('./utils/config');
const { notFound, sendError } = require('./controllers/error');
const path = require('path');

const app = express();

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }); // flags - a means new lines will be appended

// useful middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined', { stream: logStream }));

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
