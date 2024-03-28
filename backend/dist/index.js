"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customer_1 = __importDefault(require("./routes/customer")); // Import your router file
const shop_1 = __importDefault(require("./routes/shop"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mount the router for the /signin endpoint
app.use("/customer", customer_1.default);
app.use("/shop", shop_1.default);
const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
