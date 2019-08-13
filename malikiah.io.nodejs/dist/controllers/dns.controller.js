"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shell = require("shelljs");
class DNSController {
    getIpData(resolve, req) {
        shell.env["ipAddress"] = req.ip;
        var ipData = shell.exec("curl . -s http://ip-api.com/json/209.236.104.44?fields=585721").stdout;
        this.setIpData(resolve, JSON.parse(ipData));
    }
    setIpData(resolve, data) {
        let ipData = data;
        resolve(ipData);
    }
}
exports.DNSController = DNSController;
//# sourceMappingURL=dns.controller.js.map