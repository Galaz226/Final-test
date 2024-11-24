const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const app = express();




app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


const teacherRoutes = require('./routes/teacherRoutes.js');
app.use('/api/teachers', teacherRoutes);

const teacherPositionRoutes = require('./routes/teacherPositionRoutes.js');
app.use('/api/teacher-positions', teacherPositionRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});