import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import * as request from 'request';

import { DNSController, IpDataInterface } from '../../controllers/dns.controller';
import { UserService, DatabaseService } from '../../services';
import { AuthRouter } from './auth-router.module';
import { UserInterface } from "../../dependencies";
import { AdminRouter } from "./admin-router.module";
import { Http2ServerRequest } from "http2";



const dnsController: DNSController = new DNSController()
const userService: UserService = new UserService(new DatabaseService());
const databaseService: DatabaseService = new DatabaseService();

export const MainRouter = (app: express.Application ) => {
    
    AuthRouter(app);
    AdminRouter(app);
    
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        
    });

    app.post('/login', (req: Request, res: Response, next: NextFunction) => {
        
        userService.authenticateUser(res, req.body);

    });

    app.post('/register', (req: Request, res: Response, next: NextFunction) => {

        userService.registerUser(req, res);

    });

    app.get('/profile', (req: Request, res: Response, next: NextFunction) => {

        new Promise((resolve, reject) => {

            new Promise((resolve, reject) => { 
                userService.checkJWT(req, res, next, resolve); 
            })
            .then((decodedJWT: UserInterface) => {
                databaseService.find(resolve, 'users', '_id', decodedJWT._id);
            })
            
        })
        .then(
            (profile: UserInterface) => { res.status(200).send(profile); }
        )
        .catch((err) => { res.status(500).send(); })
        

    });

    app.post('/contact', (req: Request, res: Response, next: NextFunction) => {
        

    });

    app.get('/portfolio', (req: Request, res: Response, next: NextFunction) => {
        new Promise ((resolve, reject) => {
            databaseService.find(resolve, 'pages', 'type', 'portfolio', true);
        })
        .then(
            (portfolio: any) => { 
                portfolio.forEach((dataPoint: any) => {
                    request.post({url:'https://api.instagram.com/v1/users/self/?access_token=' + dataPoint.accessToken }, (err, res: request.Response, body) => {
                        console.log(res.body);
                    });
                    
                })
             }
        ) .catch((err) => { res.status(500).send(); })
        
        
    })

}