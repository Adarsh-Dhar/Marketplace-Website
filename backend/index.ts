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
app.use(helmet())

app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://marketplace-website-7.onrender.com"],
          // Add other directives as necessary
        },
      },
    })
  );



// Mount the router for the /signin endpoint
app.use("/customer", customerRouter);
app.use("/shop", shopRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
