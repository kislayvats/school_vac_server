"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_config_1 = __importDefault(require("./config/mongoose.config"));
const express_config_1 = __importDefault(require("./config/express.config"));

const app = (0, express_1.default)();

// Initialize MongoDB connection
(async () => {
    try {
        await (0, mongoose_config_1.default)();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
})();

// Configure Express
(0, express_config_1.default)(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Express is listening at http://localhost:${port}`);
    });
}

exports.default = app;
//# sourceMappingURL=app.js.map