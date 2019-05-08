import * as shell from 'shelljs';
import { Request, Response } from 'express';

export interface IpDataInterface {
    "query": string,
    "country": string,
    "city": string,
    "district": string,
    "regionName": string,
    "lat": string,
    "lon": string,
    "timezone": string,
    "isp": string,
    "org": string,
    "as": string,

}

export class DNSController {
    
    
    

    public getIpData(resolve: any, req: Request) {
        shell.env["ipAddress"] = req.ip;
        var ipData= shell.exec("curl . -s http://ip-api.com/json/209.236.104.44?fields=585721").stdout;
        this.setIpData(resolve, JSON.parse(ipData));
        
    }

    public setIpData(resolve: any, data: IpDataInterface) {
        
        let ipData: IpDataInterface = data;
        resolve(ipData);
    }
}
