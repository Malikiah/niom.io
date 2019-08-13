import * as express from 'express';
import { MainRouter } from './routes/main-router.module';



export class RouterModule {
    constructor(
    ) {  }
    public routes(app: express.Application): void {
        
        MainRouter(app);
        
    }
}
