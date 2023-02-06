import "dotenv/config";

const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
};

export default config;
