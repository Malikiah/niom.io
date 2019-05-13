import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { RouterModule } from './modules/router.module';

class App {

    public app: express.Application;
    public router: RouterModule;

    constructor(
       
    ) {
        this.router = new RouterModule( ); 
        this.app = express();
        this.config();
        
        this.router.routes(this.app); 
        
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Cross Origin Resource Sharing
        this.app.use(cors({
            origin: [ 'http://localhost:4200' ],
        }));
    }

    
}

export default new App().app; 