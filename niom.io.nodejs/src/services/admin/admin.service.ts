import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from 'express';
import * as request from 'request';

import { DatabaseService } from '../database/database.service';
import { 
    UserInterface, 
    PortfolioInterface
} from "../../dependencies/index";

const databaseService: DatabaseService = new DatabaseService();

export class AdminService {

}
