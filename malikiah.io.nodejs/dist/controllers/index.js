"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shell = require("shelljs");
class DNSController {
    ipSearch() {
        shell.exec("whois ", { silent: true }).stdout;
    }
}
exports.DNSController = DNSController;
//# sourceMappingURL=index.js.map