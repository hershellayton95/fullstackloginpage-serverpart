import session from "express-session"
import config from "../../config.js";

const sessionMiddlware = () => {
    return session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
}

export default sessionMiddlware;
