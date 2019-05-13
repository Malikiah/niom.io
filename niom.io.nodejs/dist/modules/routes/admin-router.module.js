"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
const databaseService = new services_1.DatabaseService();
const userService = new services_1.UserService(new services_1.DatabaseService());
const adminService = new services_1.AdminService();
exports.AdminRouter = (app) => {
    app.get('/users', (req, res, next) => {
        new Promise((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
            .then((decodedJWT) => {
            if (decodedJWT.role === "admin") {
                new Promise((resolve, reject) => {
                    databaseService.find(resolve, 'users');
                })
                    .then((users) => { res.status(200).send(users); });
            }
            else {
                res.status(401).send();
            }
        });
    });
    app.get('/pages', (req, res, next) => {
        new Promise((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
            .then((decodedJWT) => {
            if (decodedJWT.role === "admin") {
                new Promise((resolve, reject) => {
                    databaseService.find(resolve, 'pages');
                })
                    .then((pages) => { res.status(200).send(pages); });
            }
            else {
                res.status(401).send();
            }
        });
    });
};
//# sourceMappingURL=admin-router.module.js.map