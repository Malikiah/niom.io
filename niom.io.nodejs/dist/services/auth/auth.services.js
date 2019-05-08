"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongodb_1 = require("mongodb");
// BcryptJS Salt
const salt = bcrypt.genSaltSync(10);
const tokenExp = 60 * 60;
class AuthenticationService {
    constructor(locatorService) {
        this.locatorService = locatorService;
        this.authenticateUser = (res, loginData) => {
            console.log('running');
            new Promise((resolve, reject) => {
                this.locatorService.findThisOne(resolve, 'users', 'email', loginData.userName);
            })
                .then((userData) => {
                if (userData.userName === loginData.userName && bcrypt.compareSync(loginData.password, userData.password)) {
                    //then send a jwt to the user that will be saved locally
                    const token = jwt.sign({ 'id': userData._id, 'role': userData.role }, 'shhhhh', { expiresIn: 60 * 60 });
                    res.statusMessage = "Login Successful";
                    res.status(200).send({ 'token': token, 'role': userData.role });
                    console.log("User: " + loginData.userName + "\nAuthenticated ; Status: " + res.statusCode + "\nToken Issued");
                }
                else {
                    res.statusMessage = 'Access Denied';
                    res.status(401).send();
                }
            }, (err) => { res.status(500).send(); })
                .catch((err) => { res.statusMessage = "Account Doesn't Exist"; res.status(401).send(); });
        };
    }
    registerUser(userData, req, res) {
        req.body.email = req.body.email.toLowerCase();
        req.body.userName = req.body.userName.toLowerCase();
        let password = req.body.password;
        delete req.body.confirmPassword;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        req.body.role = 'user';
        new Promise((resolve, reject) => {
            this.locatorService.findThisOne(resolve, 'users', 'email', req.body.email);
        })
            .then((userData) => {
            if (!userData) {
                userData.db.collection('users').insertOne(req.body);
                console.log(req.body);
                this.authenticateUser(res, req.body);
            }
            else if (userData.email === req.body.email) {
                res.statusMessage = "Email Is Taken";
                res.status(409).send();
            }
            else if (userData.userName === req.body.userName) {
                res.statusMessage = "Username Is Taken";
                res.status(409).send();
            }
        });
        mongodb_1.MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const dbName = 'nymadic';
            const db = client.db(dbName);
            db.collection('users').findOne({ 'email': req.body.email }, (err, user) => {
            });
        });
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.services.js.map