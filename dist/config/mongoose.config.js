"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = __importDefault(require("."));

// Cache the database connection
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

exports.default = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        mongoose_1.default.set("strictQuery", true);
        
        cached.promise = mongoose_1.default.connect(_1.default.mongoose.url, _1.default.mongoose.options)
            .then((mongoose) => {
                console.log("Mongoose connection established");
                return mongoose;
            })
            .catch((err) => {
                console.error("Mongoose connection error:", err);
                throw err;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};
//# sourceMappingURL=mongoose.config.js.map