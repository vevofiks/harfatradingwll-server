"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const db_config_js_1 = require("./config/db.config.js");
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await (0, db_config_js_1.connectDB)();
    app_js_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();
