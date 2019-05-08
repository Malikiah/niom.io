"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const dns_controller_1 = require("../../controllers/dns.controller");
const services_1 = require("../../services");
const auth_router_module_1 = require("./auth-router.module");
const dnsController = new dns_controller_1.DNSController();
const userService = new services_1.UserService(new services_1.DatabaseService());
const databaseService = new services_1.DatabaseService();
exports.MainRouter = (app) => {
    auth_router_module_1.AuthRouter(app);
    app.get('/', (req, res, next) => {
    });
    app.get('/ip-info', (req, res, next) => {
        new Promise((resolve, reject) => {
            dnsController.getIpData(resolve, req);
        })
            .then((data) => { res.status(200).send(data); })
            .catch((err) => { res.status(500).send(); });
    });
    app.post('/login', (req, res, next) => {
        const options = {
            host: 'google.com',
            port: 80,
            path: '/recaptcha/api/siteverify?secret=6LfDuqAUAAAAAILGf4cJYMN_9e8_kwS951Yz3gZX&response=' + req.headers.ReCaptcha
        };
        http.request(options, function (res) {
            res.on('data', (chunk) => {
                console.log('It was: ' + chunk);
            });
        }).on("error", (err) => {
            console.log("Got error: " + err.message);
        });
        userService.authenticateUser(res, req.body);
    });
    app.post('/register', (req, res, next) => {
        userService.registerUser(req, res);
    });
    app.get('/profile', (req, res, next) => {
        new Promise((resolve, reject) => {
            new Promise((resolve, reject) => {
                userService.checkJWT(resolve, req, res, next);
            })
                .then((decodedJWT) => {
                console.log(decodedJWT._id);
                databaseService.find(resolve, 'users', '_id', decodedJWT._id);
            });
        })
            .then((profile) => { console.log(profile); res.status(200).send(profile); })
            .catch((err) => { res.status(500).send(); });
    });
    app.post('/contact', (req, res, next) => {
    });
    function checkRecaptcha(key) {
        app.get('https://www.google.com/recaptcha/api/siteverify?secret=6LfDuqAUAAAAAILGf4cJYMN_9e8_kwS951Yz3gZX&response=' + key, (req, res, next) => {
            console.log(res);
        });
    }
};
//# sourceMappingURL=main-router.module.js.map