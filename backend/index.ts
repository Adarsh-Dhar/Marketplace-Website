import express from "express";
import cors from "cors";
import customerRouter from "./routes/customer"; // Import your router file
import shopRouter from "./routes/shop"
const favicon = require("serve-favicon")
const path = require("path")


const app = express();

app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname,"public","favicon.ico")))


// Mount the router for the /signin endpoint
app.use("/customer", customerRouter);
app.use("/shop", shopRouter);


const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
