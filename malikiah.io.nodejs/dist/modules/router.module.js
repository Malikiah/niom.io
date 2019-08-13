"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_router_module_1 = require("./routes/main-router.module");
class RouterModule {
    constructor() { }
    routes(app) {
        main_router_module_1.MainRouter(app);
    }
}
exports.RouterModule = RouterModule;
//# sourceMappingURL=router.module.js.map