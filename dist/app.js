"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/products', product_route_1.default);
app.use('/categories', category_route_1.default);
app.use('/admin', admin_route_1.default);
exports.default = app;
