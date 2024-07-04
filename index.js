const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

require("./Conn/Conn")

const AdminRoutes = require('./Routes/AdminRoutes')
const AboutDubaiRoutes = require('./Routes/PostRoutes/AboutDubaiRoutes')
const NewsRoutes = require('./Routes/PostRoutes/NewsRoutes')
const GeneralSettings = require('./Routes/Settings/GeneralSettings')


const app = express();
app.use(express.json());
app.use(cors())


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', AdminRoutes);
app.use('/api/aboutdubai', AboutDubaiRoutes);
app.use('/api/news', NewsRoutes);
app.use('/api', GeneralSettings)

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`\x1b[33nServer running\x1b[1m`)
);