"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
const userService = new services_1.UserService(new services_1.DatabaseService());
exports.AuthRouter = (app) => {
    app.get('/authenticate', (req, res, next) => {
        new Promise((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
            .then((decodedJWT) => {
            res.status(200).send(decodedJWT);
        });
    });
};
//# sourceMappingURL=auth-router.module.js.map