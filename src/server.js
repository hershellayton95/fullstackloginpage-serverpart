
import config from "./config.js";
import app from "./app.js";

const port = config.SERVER_PORT;

app.listen(port, () => {
    console.log(`[SERVER] Server are running on http:localhost:${port}`);
});
