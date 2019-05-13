import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { UserService, DatabaseService, AdminService } from "../../services";
import { UserInterface } from "../../dependencies";


const databaseService: DatabaseService = new DatabaseService();
const userService: UserService= new UserService(new DatabaseService());
const adminService: AdminService = new AdminService();

export const AdminRouter = (app: express.Application) => { 

    app.get('/users', (req: Request, res: Response, next: NextFunction) => {
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
                        )

                } else {
                    res.status(401).send();
                }
            })
    })

    app.get('/pages', (req: Request, res: Response, next: NextFunction) => {
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
                        (pages: any) => { res.status(200).send(pages); }
                        )

                } else {
                    res.status(401).send();
                }
            } 
        )
    })
}
