import { config } from "dotenv";
config({path:`.env.${process.env.NODE_ENV || "development"}.local`});
export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV, ARCJET_API_KEY, ARCJET_ENV , QSTASH_URL, QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY , SERVER_URL } = process.env;