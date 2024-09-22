const express = require("express");
const app = express();

const { APP_PORT } = require("./config");

// Database connect
const connectDB = require("./config/db");
connectDB();

// bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes
const userRoutes = require("./routes/userRouters");
const taskRoutes = require("./routes/taskRoutues");
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// Listening port
const PORT = APP_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
