"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
const databaseService = new services_1.DatabaseService();
const userService = new services_1.UserService(new services_1.DatabaseService());
const adminService = new services_1.AdminService();
exports.AdminRouter = (app) => {
    app.get('/admin/users', (req, res, next) => {
        new Promise((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
            .then((decodedJWT) => {
            if (decodedJWT.role === "admin") {
                new Promise((resolve, reject) => {
                    databaseService.find(resolve, 'users');
                })
                    .then((users) => { res.status(200).send(users); }).catch((err) => { res.sendStatus(500); });
            }
            else {
                res.status(401).send();
            }
        });
    });
    app.get('/admin/pages', (req, res, next) => {
        new Promise((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
            .then((decodedJWT) => {
            if (decodedJWT.role === "admin") {
                new Promise((resolve, reject) => {
                    databaseService.find(resolve, 'pages');
                })
                    .then((pages) => { res.status(200).send(pages); }).catch((err) => { res.sendStatus(500); });
            }
            else {
                res.status(401).send();
            }
        });
    });
    app.post('/admin/create-page', (req, res, next) => {
        console.log(req.body);
        new Promise((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
            .then((decodedJWT) => {
            if (decodedJWT.role === "admin") {
                new Promise((resolve, reject) => {
                    databaseService.insert('pages', req.body, resolve);
                })
                    .then(() => { console.log('stuff'); res.status(200).send(); }).catch((err) => { res.sendStatus(500); });
            }
            else {
                res.status(401).send();
            }
        });
    });
    app.post('/admin/delete', (req, res, next) => {
        new Promise((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
            .then((decodedJWT) => {
            if (decodedJWT.role === "admin") {
                new Promise((resolve, reject) => {
                    databaseService.delete(req.body.collection, req.body.criteriaValue, resolve);
                })
                    .then(() => { res.status(200).send(); }).catch((err) => { res.sendStatus(500); });
            }
            else {
                res.status(401).send();
            }
        });
    });
};
//# sourceMappingURL=admin-router.module.js.map