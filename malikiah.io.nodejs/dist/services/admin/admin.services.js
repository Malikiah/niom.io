"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const database_service_1 = require("../database/database.service");
const databaseService = new database_service_1.DatabaseService();
class AdminService {
    getInstagramToken(code, dataPoint, resolve) {
        request.post({ url: 'https://www.instagram.com/oauth/access_token', form: {
                client_id: dataPoint.clientId,
                client_secret: dataPoint.clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost',
                code: code
            } }, (err, res, body) => { databaseService.update(dataPoint._id, 'pages', 'accessToken', body.access_token, resolve); });
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.services.js.map