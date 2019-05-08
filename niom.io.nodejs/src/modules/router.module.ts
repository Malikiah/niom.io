import * as express from 'express';
import { MainRouter } from './routes/main-router.module';
import { UserService } from '../services/user/user.services';



export class RouterModule {
    constructor(
    ) {  }
    public routes(app: express.Application): void {
        
        MainRouter(app);
        
    }
}
