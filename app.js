// const express = require('express');
// const app = express();
// const connectDB = require('./database/db');
// const dotenv = require('dotenv');
// dotenv.config();
// connectDB();


// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API Running');
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const authRoute = require('./routes/authRoute');

const app = express();


// MIDDLEWARE
app.use(express.json());


// ROUTES
app.use('/api/auth', authRoute);


// TEST ROUTE
app.get('/', (req, res) => {

  res.send('API Running Successfully');
});


// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log('MongoDB Connected');

  app.listen(5000, () => {

    console.log('Server Running On Port 5000');
  });

})

.catch((error) => {

  console.log(error);
});
