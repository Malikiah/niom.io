import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import * as http from 'http';

import { DNSController, IpDataInterface } from '../../controllers/dns.controller';
import { UserService, DatabaseService } from '../../services';
import { AuthRouter } from './auth-router.module';
import { UserInterface } from "../../dependencies";



const dnsController: DNSController = new DNSController()
const userService: UserService = new UserService(new DatabaseService());
const databaseService: DatabaseService = new DatabaseService();

export const MainRouter = (app: express.Application ) => {
    
    AuthRouter(app);
    
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        
    });
    
    app.get('/ip-info', (req: Request, res: Response, next: NextFunction) => {

        new Promise((resolve, reject) => {
            dnsController.getIpData(resolve, req);
        })
        .then(
            (data: IpDataInterface) => { res.status(200).send(data); }
        )
        .catch((err) => { res.status(500).send(); })
        
    });

    app.post('/login', (req: Request, res: Response, next: NextFunction) => {
        
        const options = {
            host: 'google.com',
            port: 80,
            path: '/recaptcha/api/siteverify?secret=6LfDuqAUAAAAAILGf4cJYMN_9e8_kwS951Yz3gZX&response='+ req.headers.ReCaptcha
        }
        http.request(options, function(res){
            
            res.on('data', (chunk) =>{
              console.log('It was: ' + chunk);
            });
          }).on("error", (err) => {
            console.log("Got error: " + err.message);
          });

        userService.authenticateUser(res, req.body);

    });

    app.post('/register', (req: Request, res: Response, next: NextFunction) => {
        
        userService.registerUser(req, res);

    });

    app.get('/profile', (req: Request, res: Response, next: NextFunction) => {

        new Promise((resolve, reject) => {

            new Promise((resolve, reject) => { 
                userService.checkJWT(resolve, req, res, next); 
            })
            .then((decodedJWT: UserInterface) => {
                console.log(decodedJWT._id)
                databaseService.find(resolve, 'users', '_id', decodedJWT._id);
            })
            
        })
        .then(
            (profile: UserInterface) => { console.log(profile); res.status(200).send(profile); }
        )
        .catch((err) => { res.status(500).send(); })
        

    });

    app.post('/contact', (req: Request, res: Response, next: NextFunction) => {
        

    })

    function checkRecaptcha( key?: string ) {
        
        app.get('https://www.google.com/recaptcha/api/siteverify?secret=6LfDuqAUAAAAAILGf4cJYMN_9e8_kwS951Yz3gZX&response=' + key,
        (req: Request, res: Response, next: NextFunction) => {
            console.log(res);
        })
    }
}