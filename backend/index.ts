import express from "express";
import cors from "cors";
import customerRouter from "./routes/customer"; // Import your router file
import shopRouter from "./routes/shop"
const favicon = require("serve-favicon")
const path = require("path")
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname,"public","favicon.ico")))

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", 'https://marketplace-website-7.onrender.com'],
        // Add other directives as needed
    }
}));


// Mount the router for the /signin endpoint
app.use("/customer", customerRouter);
app.use("/shop", shopRouter);


const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
