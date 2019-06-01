"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router_module_1 = require("./modules/router.module");
class App {
    constructor() {
        this.router = new router_module_1.RouterModule();
        this.app = express();
        this.config();
        this.router.routes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // Cross Origin Resource Sharing
        this.app.use(cors({
            origin: ['http://localhost', 'http://localhost:4200'],
        }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map