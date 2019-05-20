"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class AdminService {
    getInstagramToken(dataPoint) {
        request.post({ url: 'https://www.instagram.com/oauth/access_token', form: {
                client_id: dataPoint.clientId,
                client_secret: dataPoint.clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost',
                code: 'fsdfsdf'
            } }, (err, res, body) => { console.log(err); });
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.services.js.map