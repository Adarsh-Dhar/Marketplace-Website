import express from "express";
import cors from "cors";
import customerRouter from "./routes/customer"; // Import your router file
import shopRouter from "./routes/shop"


const app = express();

app.use(cors());
app.use(express.json());



// Mount the router for the /signin endpoint
app.use("/customer", customerRouter);
app.use("/shop", shopRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
