import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { UserService, DatabaseService } from "../../services";
import { UserInterface } from "../../dependencies";

const userService: UserService = new UserService(new DatabaseService());

export const AuthRouter = (app: express.Application) => { 

    app.get('/authenticate', (req: Request, res: Response, next: NextFunction) => {
        new Promise((resolve, reject) => {
            userService.checkJWT(resolve,req, res, next);
        })
        .then(
            (decodedJWT: UserInterface) => { 
                res.status(200).send(decodedJWT);
             }
        )
        
        
        

        
    })

    
} 
