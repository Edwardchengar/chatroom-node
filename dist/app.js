"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get("/", (req, res) => {
    console.log(app.get("port"));
    console.log(process.env.PORT);
    res.send("Well done!");
});
app.listen(3000, () => {
    console.log("The application is listening on port 3000!");
});
exports.default = app;
//# sourceMappingURL=app.js.map