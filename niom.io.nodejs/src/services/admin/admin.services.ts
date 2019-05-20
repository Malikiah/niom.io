import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from 'express';
import * as request from 'request';

import { DatabaseService } from '../database/database.service';
import { 
    UserInterface, 
    PortfolioInterface
} from "../../dependencies/index";

export class AdminService {

    getInstagramToken(dataPoint: PortfolioInterface) {
        request.post({url:'https://www.instagram.com/oauth/access_token', form: { 
            client_id: dataPoint.clientId, 
            client_secret: dataPoint.clientSecret, 
            grant_type:'authorization_code', 
            redirect_uri:'http://localhost',
            code: 'fsdfsdf' }}
        , (err: any, res: any, body: any) => { console.log(err); } )
    }

}
