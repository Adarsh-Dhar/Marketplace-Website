"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const customer_1 = __importDefault(require("./routes/customer")); // Import your router file
const shop_1 = __importDefault(require("./routes/shop"));
const favicon = require("serve-favicon");
const path = require("path");
const helmet = require('helmet');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(helmet());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://marketplace-website-7.onrender.com"],
            // Add other directives as necessary
        },
    },
}));
// Mount the router for the /signin endpoint
app.use("/customer", customer_1.default);
app.use("/shop", shop_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
