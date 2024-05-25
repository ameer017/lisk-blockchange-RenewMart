require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./route/userRoute");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["*", "http://localhost:3000"],
    credentials: true,
    methods: "GET, POST, PATCH, DELETE, OPTIONS, HEAD",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use("/api/users", userRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
