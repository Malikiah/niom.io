import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { UserService, DatabaseService, AdminService } from "../../services";
import { UserInterface } from "../../dependencies";


const databaseService: DatabaseService = new DatabaseService();
const userService: UserService= new UserService(new DatabaseService());
const adminService: AdminService = new AdminService();

export const AdminRouter = (app: express.Application) => { 

    app.get('/admin/users', (req: Request, res: Response, next: NextFunction) => {
        new Promise ((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
        .then(
            (decodedJWT: UserInterface) => {

                if(decodedJWT.role === "admin") {
                    
                    new Promise ((resolve, reject) => {
                        databaseService.find(resolve, 'users');
                    })
                    .then(
                        (users: any) => { res.status(200).send(users); }
                        ) .catch((err) => { res.sendStatus(500); })

                } else {
                    res.status(401).send();
                }
            })
    })

    app.get('/admin/pages', (req: Request, res: Response, next: NextFunction) => {
        new Promise ((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
        .then(
            (decodedJWT: UserInterface) => {

                if(decodedJWT.role === "admin") {
                    
                    new Promise ((resolve, reject) => {
                        databaseService.find(resolve, 'pages');
                    })
                    .then(
                        (pages: any) => { console.log(pages); res.status(200).send(pages); }
                        ) .catch((err) => { res.sendStatus(500); })
                    

                } else {
                    res.status(401).send();
                }
            } 
        )
    })

    app.post('/admin/create-page', (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        new Promise ((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
        .then(
            (decodedJWT: UserInterface) => {

                if(decodedJWT.role === "admin") {
                    
                    new Promise ((resolve, reject) => {
                        databaseService.insert('pages', req.body, resolve);
                    })
                    .then(
                        () => { res.status(200).send(); }
                        ) .catch((err) => { res.sendStatus(500); })

                } else {
                    res.status(401).send();
                }
            } 
        )
        
    })

    app.post('/admin/delete', (req, res, next) => {
        
        new Promise ((resolve, reject) => {
            userService.checkJWT(req, res, next, resolve);
        })
        .then(
            (decodedJWT: UserInterface) => {

                if(decodedJWT.role === "admin") {
                    
                    new Promise ((resolve, reject) => {
                        databaseService.delete(req.body.collection, req.body.criteriaValue, resolve);
                    })
                    .then(
                        () => { res.status(200).send(); }
                        ) .catch((err) => { res.sendStatus(500); })

                } else {
                    res.status(401).send();
                }
            } 
        )
        })
    
}
