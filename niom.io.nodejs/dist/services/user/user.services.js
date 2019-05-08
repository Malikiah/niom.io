"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// BcryptJS Salt
const salt = bcrypt.genSaltSync(10);
const tokenExp = 60 * 60;
class UserService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.authenticateUser = (res, loginData) => {
            console.log('running');
            console.log(loginData);
            new Promise((resolve, reject) => {
                this.databaseService.find(resolve, 'users', 'email', loginData.email);
            })
                .then((userData) => {
                console.log(userData);
                if (userData.email === loginData.email && bcrypt.compareSync(loginData.password, userData.password)) {
                    //then send a jwt to the user that will be saved locally
                    const token = jwt.sign({ '_id': userData._id, 'role': userData.role }, 'shhhhh', { expiresIn: 60 * 60 });
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
    registerUser(req, res) {
        req.body.email = req.body.email.toLowerCase();
        req.body.userName = req.body.userName.toLowerCase();
        delete req.body.confirmPassword;
        delete req.body.recaptcha;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        req.body.role = 'user';
        console.log(req.body);
        new Promise((resolve, reject) => {
            this.databaseService.find(resolve, 'users', 'email', req.body.email);
        })
            .then((userData) => {
            console.log(userData);
            if (!userData) {
                console.log(userData);
                this.databaseService.insert('users', req.body);
                console.log('here');
                res.status(201).send();
            }
            else if (userData.email === req.body.email) {
                res.statusMessage = "Email Is Taken";
                res.status(409).send();
            }
            else if (userData.userName === req.body.userName) {
                res.statusMessage = "Username Is Taken";
                res.status(409).send();
            }
        }).catch((err) => { res.status(500).send(); console.log(err); });
    }
    checkJWT(resolve, req, res, next) {
        jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
            if (decoded) {
                resolve(decoded);
            }
            else {
                res.status(403).send();
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map