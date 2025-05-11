"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const CounterSchema = new mongoose_2.Schema({
    seq: { type: Number, default: 0 },
});
exports.default = (0, mongoose_1.model)("Counter", CounterSchema);
//# sourceMappingURL=counter.schema.js.map