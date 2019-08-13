"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns_controller_1 = require("../../controllers/dns.controller");
const services_1 = require("../../services");
const auth_router_module_1 = require("./auth-router.module");
const admin_router_module_1 = require("./admin-router.module");
const dnsController = new dns_controller_1.DNSController();
const userService = new services_1.UserService(new services_1.DatabaseService());
const databaseService = new services_1.DatabaseService();
const adminService = new services_1.AdminService();
const instagramService = new services_1.InstagramService();
exports.MainRouter = (app) => {
    auth_router_module_1.AuthRouter(app);
    admin_router_module_1.AdminRouter(app);
    app.get('/', (req, res, next) => {
    });
    app.post('/login', (req, res, next) => {
        userService.authenticateUser(res, req.body);
    });
    app.post('/register', (req, res, next) => {
        userService.registerUser(req, res);
    });
    app.get('/profile', (req, res, next) => {
        new Promise((resolve, reject) => {
            new Promise((resolve, reject) => {
                userService.checkJWT(req, res, next, resolve);
            })
                .then((decodedJWT) => {
                databaseService.find(resolve, 'users', '_id', decodedJWT._id);
            });
        })
            .then((profile) => { res.status(200).send(profile); })
            .catch((err) => { res.status(500).send(); });
    });
    app.post('/contact', (req, res, next) => {
    });
    app.get('/portfolio', (req, res, next) => {
        new Promise((resolve, reject) => {
            databaseService.find(resolve, 'pages', 'type', 'portfolio', true);
        })
            .then((pages) => {
            new Promise((resolve, reject) => {
                instagramService.getInstagramProfileBasic(resolve, pages);
            })
                .then((data) => { res.status(200).send(data); }).catch((err) => { console.log(err); res.status(500).send(); });
        });
        /*console.log('here');
       new Promise ((resolve, reject) => {
           databaseService.find(resolve, 'pages', 'type', 'portfolio', true);
       })
       .then(
           (portfolio: any) => {
               portfolio.forEach((dataPoint: any) => {
                   console.log(dataPoint);
                   request.post({url:'https://api.instagram.com/v1/users/self/', form: { 'access_token': dataPoint.accessToken }}, (err, res: request.Response, body) => {
                       console.log('here');
                       console.log(res);
                       console.log(err);
                   });
                   
               })
            }
       ) .catch((err) => { res.status(500).send(); })*/
    });
};
//# sourceMappingURL=main-router.module.js.map