"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = __importDefault(require("."));
exports.default = () => {
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default.connect(_1.default.mongoose.url, _1.default.mongoose.options);
    mongoose_1.default.connection.on("connected", function () {
        console.log("Mongoose default connection open");
    });
    // If the connection throws an error
    mongoose_1.default.connection.on("error", function (err) {
        console.log("Mongoose default connection error: " + err);
    });
    // When the connection is disconnected
    mongoose_1.default.connection.on("disconnected", function () {
        console.log("Mongoose default connection disconnected");
    });
    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", function () {
        mongoose_1.default.connection.close();
    });
};
//# sourceMappingURL=mongoose.config.js.map