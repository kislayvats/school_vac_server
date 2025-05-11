import express from "express";

import mongooseConfig from "./config/mongoose.config";
import expressConfig from "./config/express.config";

const app = express();
const port = 3000;

mongooseConfig();
expressConfig(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
