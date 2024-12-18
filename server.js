const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const helmet=require("helmet"); 
const app = express();
app.use(cors());
app.use(express.json()); 
const helmet = require('helmet');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://vercel.live"],
      },
    },
  })
);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
