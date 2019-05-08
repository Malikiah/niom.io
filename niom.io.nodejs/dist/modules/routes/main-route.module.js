"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
exports.MainRouter = (app) => {
    app.get('/', (req, res, next) => {
        res.send('more tacos');
    });
};
//# sourceMappingURL=main-route.module.js.map