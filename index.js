const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = 4000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(morgan("combined"));
app.use(helmet());

app.use(express.json());

const routes = require("./routes");

app.use("/api", routes);

app.listen(port);
