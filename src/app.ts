import express from "express";

import mongooseConfig from "./config/mongoose.config";
import expressConfig from "./config/express.config";

const app = express();

mongooseConfig();
expressConfig(app);

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Express is listening at http://localhost:${port}`);
    });
}

export default app;
